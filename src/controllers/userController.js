import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            messange: 'Missing inputs parameter'
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        messange: userData.errMessage,
        user: userData.user ? userData.user : { phong: 9 }
    })
}
module.exports = {
    handleLogin: handleLogin
}