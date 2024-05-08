import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
  //Obtener errores del request
  const bodyErrors = validationResult(req);

  if (!bodyErrors.isEmpty()) return res.status(400).json(bodyErrors);

  next();
};

export default validateFields;
