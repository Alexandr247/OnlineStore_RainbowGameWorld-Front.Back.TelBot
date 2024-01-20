import express, { json } from 'express'

import mongoose from 'mongoose'
import cors from 'cors'

import { registerValidation, loginValidation } from './validations.js'

import checkAuth from './utils/checkAuth.js'

import * as UserController from './controllers/UserController.js' // Вытаскиваем все методы

// Подключаемся к MongoDB
mongoose
    .connect('mongodb+srv://admin:qwerty123@rainbowgameworld.ubi1aub.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => { console.log('Started: mongoDB') }) // Если подключение прошло успешно
    .catch((err) => { console.log(`Error mongoDB: ${err}`) }) // Если подключение не удалось


const app = express()

// req - то, что мне прислал пользователь
// res - то, что я отправляю пользователю

app.use(express.json()) // Учим Express понимать JSON

app.use(cors()) // Отключаем блокировку CORS в Node.js

//* Ловим POST-запрос по адресу login
app.post('/auth/login', loginValidation, UserController.login)

//* Ловим POST-запрос по адресу register
app.post('/auth/register', registerValidation, UserController.register)

//* Проверяем, можем ли мы получить информацию о себе
app.get('/auth/me', checkAuth, UserController.getMe)

//* Запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(`Error server: ${err}`)
    }

    console.log(`Started server: http://localhost:${4444}`)
})