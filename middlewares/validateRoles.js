const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role != "ADMIN")
    return res.status(401).json({
      message: "Error the user is not an Admin",
    });
  next();
};

const validateRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!req.user) return res.status(500).json({ message: "Invalid token" });

    if (!roles.includes(req.user.role))
      return res.status(401).json({
        message: `You lack of the rol: ${roles} `,
      });

    next();
  };
};

export { isAdmin, validateRoles };
