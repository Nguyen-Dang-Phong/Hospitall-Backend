import bcrypt from 'bcryptjs';
import dt from '../models/index'
import { response } from 'express';
let salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('ok create')
        } catch (error) {
            reject(error)
        }
    })

}
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
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await dt.User.findAll({
                raw: true
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInforById = await dt.User.findOne({
                where: { id: userId },
                raw: true
            })
            if (userInforById) {
                resolve(userInforById)

            } else {
                resolve({})

            }
        } catch (error) {
            reject(error)
        }
    })

}
let updateUserData = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await dt.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await dt.User.findAll()
                resolve(allUsers)

            } else {
                resolve()

            }
        } catch (error) {
            reject(error)
        }
    })

}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await dt.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy()
                let allUsers = await dt.User.findAll()
                resolve(allUsers)
            } else { resolve() }

        } catch (error) {
            reject(error)
        }
    })

}
module.exports = {
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    getAllUsers: getAllUsers,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById

}