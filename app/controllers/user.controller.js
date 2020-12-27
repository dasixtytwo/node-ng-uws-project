exports.allPublicAccess = (req, res) => {
  res.status(200).send("This is the Public HomePage.");
};

exports.userDashboard = (req, res) => {
  res.status(200).send("This is the User Page and is a private page.");
};

exports.adminDashboard = (req, res) => {
  res.status(200).send("This is the Admin Page and is a private page.");
};

exports.moderatorDashboard = (req, res) => {
  res.status(200).send("This is the Moderator Page and is a private page.");
};