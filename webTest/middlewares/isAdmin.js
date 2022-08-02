const isAdmin = (req, res, next) => {
  try {
    console.log(req.body.admin);
    const role = req.body.admin;
    if (role) {
      next();
      return;
    }
    return res.status(401).json({
      message: "No estas autorizado para realizar esta accion",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = isAdmin;
