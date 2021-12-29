function authenticateAdmin(req, res, next) {
  if (req.body.jToken.role === "admin") {
    next();
  } else {
    return res.status(403).send({
      message: "Do not proceed.",
    });
  }
}
module.exports = authenticateAdmin;
