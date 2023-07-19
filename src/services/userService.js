import dt from '../models/index'
import bcrypt from 'bcryptjs'
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExit = await checkUserEmail(email)
            if (isExit) {
                let user = await dt.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';

                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exits in your systeam. Plz try other email!`;

            }
            resolve(userData)

        } catch (error) {
            resolve(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}