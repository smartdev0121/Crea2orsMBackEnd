import { validationResult } from "express-validator";

const displayErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};

export const validator = (validators) => (target, key, descriptor) => {
  const original = descriptor.value;
  descriptor.value =
    validators.constructor === Array
      ? [...validators, displayErrors, original]
      : [validators, displayErrors, original];
  return descriptor;
};
