const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = app => {
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", controller.allPublicAccess);

  router.get(
    "/user", 
    [authJwt.verifyToken], 
    controller.userDashboard
  );

  router.get(
    "/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorDashboard
  );

  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminDashboard
  );

  // Retrieve all Users
  router.get(
    "/", 
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.findAll
  );

  // Update user by id
  router.put(
    '/user/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update_user_by_id
  )

  // Retrieve user by Id
  router.get(
    '/user/:id', 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.find_user_by_id
  );

  // Delete user by Id
  router.delete(
    '/user/:id', 
    [authJwt.verifyToken, authJwt.isAdmin], 
    controller.delete_user_by_id
  );

  app.use('/api/users', router);
};