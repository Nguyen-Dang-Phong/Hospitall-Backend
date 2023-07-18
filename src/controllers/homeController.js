import dt from '../models/index'
import CRUDService from '../services/CRUDservice'
let getHomePage = async (req, res) => {
    try {
        let data = await dt.User.findAll()
        console.log(data)
        return res.render('homepage.ejs', {
            // truyen data ra view
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e)
    }
}
let getAbout = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let messange = await CRUDService.createNewUser(req.body)
    console.log(messange)
    return res.send('post crud');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers()
    console.log(data)
    return res.render('displayCRUD.ejs', {
        data
    });
}
let getEditCRUD = async (req, res) => {
    // Lay id tren url
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        console.log(userData)
        return res.render('editCRUD', { userData })
    } else {
        return res.send('not found')

    }

}
let putCRUD = async (req, res) => {
    // Lay id tren url
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        data: allUsers
    });
    // return res.send('not found')


}
let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        let allUsers = await CRUDService.deleteUserById(id)
        return res.render('displayCRUD.ejs', {
            data: allUsers
        });
    } else {
        return res.send('not found')
    }



}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}