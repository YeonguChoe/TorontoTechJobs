const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Company = require("../model/Company");
const auth = require("../middleware/auth");

// Company registration route
router.post("/register", async (req, res) => {
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
    const token = jwt.sign(payload, "your_jwt_secret", { expiresIn: "2h" });

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
    if (!company) return res.status(400).json({ message: false });

    const isMatch = await company.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: false });

    const payload = { id: company.id, company_name: company.company_name };
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
