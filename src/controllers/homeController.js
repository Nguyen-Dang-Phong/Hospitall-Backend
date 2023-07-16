import dt from '../models/index'
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
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout
}