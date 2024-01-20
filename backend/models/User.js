import mongoose from 'mongoose'

//* Структура/схема пользователей
const UserSchema = new mongoose.Schema({

    // Все свойства, которые могут быть у пользователя
    fullName: {
        type: String,
        required: true, // Имя должно быть обязательным
    },
    email: {
        type: String,
        required: true,
        unique: true, // Почта должна быть уникальной
    },
    passwordHash: {
        type: String,
        required: true,
    },

    //TODO: Аватарка пользователя
    // avatarUrl: String, 

}, {

    // Свойства, которые будут определены не пользователем
    timestamps: true,
})

export default mongoose.model('User', UserSchema)