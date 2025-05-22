const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Sadece admin erişebilir" });
  }
  next();
};

module.exports = verifyAdmin;
