import { body } from 'express-validator'

// Проверяет вход, есть ли почта и пароль
export const loginValidation = [

    // Валидация
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),
]

// Проверяет есть ли почта, пароль и т.д.
export const registerValidation = [
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Пароль має бути мінімум 5 символів').isLength({ min: 5 }),
    // body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('fullName', 'Вкажіть ім\'я').isLength({ min: 1 }),

    //TODO: Аватарка пользователя
    // body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]