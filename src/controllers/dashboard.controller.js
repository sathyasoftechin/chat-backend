exports.getDashboard = (req, res) => {
  res.json({
    message: `Welcome ${req.user.username} to the dashboard`
  });
};
