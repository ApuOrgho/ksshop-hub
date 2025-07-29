import { body, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const usersPath = path.join(__dirname, "../storage/users.json");

export const validateRegister = [
  body("email")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .custom((value) => {
      const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
      if (users.find((u) => u.email === value)) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("phone")
    .isMobilePhone()
    .withMessage("Invalid phone")
    .custom((value) => {
      const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
      if (users.find((u) => u.phone === value)) {
        throw new Error("Phone already in use");
      }
      return true;
    }),
  body("fullName").isLength({ min: 2 }).trim().escape(),
  body("password").isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("address.city").notEmpty().trim().escape(),
  body("address.house").notEmpty().trim().escape(),
  body("address.village").notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body("emailOrPhone").notEmpty(),
  body("password").isLength({ min: 6 }),
];
