import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator'

import UserModel from '../models/User.js'


export const register = async (req, res) => {

    try {
        const errors = validationResult(req) // Вытаскиваем все ошибки из валидатора

        // Если ошибки не пустые
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()) // Возвращаем пользователю ответ с ошибками
        }

        // Хеширование пароля пользователя
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        // Подготавливаем документ для создания пользователя в БД
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save() // Сохраняем документ в БД

        // Создаем токен
        const token = jwt.sign({
            _id: user._id,
        }, 'secret', {
            expiresIn: '30d', // Сколько времени будет жить токен
        })

        const { passwordHash, ...userData } = user._doc // Не показываем хеш при регистрации

        // Если ошибок нет
        res.json({
            ...userData,
            token,
        })

    } catch (err) {
        console.log(`Error register: ${err}`)

        res.status(500).json({
            message: 'Не вдалося зареєструватися'
        })
    }

} 

export const login = async (req, res) => {

    try {

        //Ищем пользователя в БД по почте
        const user = await UserModel.findOne({ email: req.body.email })

        //Если такой почты нет в БД
        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайдений'
            })
        }

        //Если есть такой пользователь в БД
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        //Если пароль в БД и введенным пользователем на совпадают
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Неправильний пароль'
            })
        }

        //Создаем токен
        const token = jwt.sign({
            _id: user._id,
        }, 'secret', {
            expiresIn: '30d', //Сколько времени будет жить токен
        })

        const { passwordHash, ...userData } = user._doc //Не показываем хеш при регистрации

        //Если ошибок нет
        res.json({
            ...userData,
            token,
        })

    } catch (err) {
        console.log(`Error authorization: ${err}`)

        res.status(500).json({
            message: 'Не вдалося авторизуватися'
        })
    }

}

export const getMe = async (req, res) => {
    
    try {

        // Находим пользователя
        const user = await UserModel.findById(req.userId)

        // Если пользователь не найден
        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайдений',
            })
        }

        // Если пользователь найден
        const { passwordHash, ...userData } = user._doc // Не показываем хеш при регистрации

        // Если ошибок нет
        res.json({
            ...userData,
        })

    } catch (err) {
        return res.status(500).json({
            message: 'Немає доступу',
        })
    }

}