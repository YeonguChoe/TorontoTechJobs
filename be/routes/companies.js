const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");
const auth = require("../middleware/auth");

// Company registration route
router.post("/register", async (req, res) => {
  try {
    const { companyName, email, password, companyURL } = req.body;

    // Check if the company already exists
    let company = await Company.findOne({ email });
    if (company)
      return res.status(400).json({
        message: "company already exists. Please try with different email.",
      });

    company = new Company({ companyName, email, password, companyURL });
    await company.save();

    const payload = { id: company.id, CompanyName: company.companyName };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json({ token, company: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Company login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company)
      return res
        .status(400)
        .json({ message: "Invalid credentials - wrong email" });

    const isMatch = await company.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Invalid credentials - wrong password" });

    const payload = { id: company.id, companyName: company.companyName };
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token, company: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update company information
router.patch("/update", auth, async (req, res) => {
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
    if (!company) return res.status(404).json({ message: "Company not found" });

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
});

module.exports = router;
