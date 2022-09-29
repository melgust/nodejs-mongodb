const { authJwt } = require("../middlewares");
const controller = require("../controllers/user");

module.exports = function(app) {
  
  app.get("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], [controller.getUsers]);

  app.get("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.getUsersById]);

  app.put("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.updateUser]);

  app.delete("/api/user/:id", [authJwt.verifyToken, authJwt.isAdmin], [controller.deleteUser]);

  app.delete("/api/user/all", [authJwt.verifyToken, authJwt.isAdmin], [controller.deleteAllUsers]);
  
};