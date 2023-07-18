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

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD
}