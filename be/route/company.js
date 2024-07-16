const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Company = require("../model/Company");
const { query, body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// Company registration route
router.post(
  "/register",
  [
    body("company_name")
      .isString()
      .withMessage("company_name must be a string"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("companyURL").isString().withMessage("companyURL must be a string"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { company_name, email, password, companyURL } = req.body;

      // Check if the company already exists
      let company = await Company.findOne({ email });
      if (company)
        return res.status(400).json({
          message: "Company already exists. Please try with different email.",
        });

      company = new Company({ company_name, email, password, companyURL });
      await company.save();

      const payload = { id: company.id, company_name: company.company_name };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      res.status(201).json({ token, company: payload });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Company login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      const company = await Company.findOne({ email });
      if (!company) return res.status(400).json({ message: false });

      const isMatch = await company.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: false });

      const payload = { id: company.id, company_name: company.company_name };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ token, company: payload });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// Update company information
router.patch(
  "/update",
  auth,
  [
    body("email").optional().isEmail().withMessage("Enter a valid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("companyURL").optional().isURL().withMessage("Enter a valid URL"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ["email", "password", "companyURL"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates!" });
    }

    try {
      const company = await Company.findById(req.company.id);
      if (!company)
        return res.status(404).json({ message: "Company not found" });

      updates.forEach((update) => (company[update] = req.body[update]));

      // If password is being updated, hash it before saving
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        company.password = await bcrypt.hash(req.body.password, salt);
      }

      await company.save();
      res.json(company);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.get(
  "/filter-by-company-name",
  [
    query("company_name")
      .exists()
      .withMessage("company_name query parameter is required")
      .isString()
      .withMessage("Invalid company_name"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { company_name } = req.query; // Get the company_name from the query parameters
      if (!company_name) {
        return res
          .status(400)
          .json({ message: "company_name query parameter is required" });
      }
      const company = await Company.find({ company_name: company_name });
      if (company.length === 0) {
        return res.status(404).json({
          message: "No company found for the specified company_name",
        });
      }
      res.json(company);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
