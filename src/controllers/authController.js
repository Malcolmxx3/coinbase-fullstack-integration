const getProfile = (req, res) => {
  const { name, email } = req.user;

  return res.status(200).json({
    name,
    email,
  });
};

module.exports = {
  getProfile,
};
