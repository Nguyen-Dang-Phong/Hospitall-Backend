import dt from '../models/index'
import bcrypt from 'bcryptjs'
let salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })

}
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
            let user = await dt.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await dt.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }


            if (userId && userId !== 'ALL') {
                users = await dt.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkEmail = await checkUserEmail(data.email)
            if (checkEmail === true) {
                resolve({
                    errCode: 1,
                    errMessage: "The Email is succesfull"
                })
            }
            console.log(data.password)
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await dt.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender == '1' ? true : false,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                errMessage: "OK"
            })
        } catch (error) {
            reject(error)
        }

    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await dt.User.findOne({
                where: { id: userId },
                raw: false
            })
            if (user) {
                await user.destroy()
                resolve({
                    errCode: 0,
                    errMessage: 'Oki'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'ERR'
                })
            }
        } catch (error) {
            reject(error)

        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.id) {
            resolve({
                errCode: 1,
                errMessage: 'ID err'
            })
        }
        try {
            let user = await dt.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Oki'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'ID err'
                })

            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser
}