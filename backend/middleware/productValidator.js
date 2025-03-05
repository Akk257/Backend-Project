import { body } from "express-validator";

// Produktvalidierung
export const productValidator = [
  body("title").notEmpty().withMessage("Titel ist erforderlich"),
  body("description").notEmpty().withMessage("Beschreibung ist erforderlich"),
  body("price")
    .isNumeric()
    .withMessage("Preis muss eine Zahl sein")
    .notEmpty()
    .withMessage("Preis ist erforderlich"),
  body("category").notEmpty().withMessage("Kategorie ist erforderlich"),
  body("weight")
    .isNumeric()
    .withMessage("Gewicht muss eine Zahl sein")
    .optional(), // optional, aber wenn angegeben, muss es eine Zahl sein
];
