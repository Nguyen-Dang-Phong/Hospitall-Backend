import express from "express"
import homeController from "../controllers/homeController";
import userController from "../controllers/userController"
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAbout)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', userController.handleGetAllUsers);

    router.post('/api/create-new-user', userController.handleCreateNewUsers);
    router.put('/api/edit-user', userController.handleEditUsers);
    router.delete('/api/delete-user', userController.handleDeleteUsers);
    router.get('/allcode', userController.getAllCode)




    return app.use("/", router)
}
module.exports = initWebRoutes;