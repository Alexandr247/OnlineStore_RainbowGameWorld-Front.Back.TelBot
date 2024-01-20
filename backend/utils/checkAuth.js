import jwt from 'jsonwebtoken'

//* Расшифровка токена
export default (req, res, next) => {

    // Вытаскиваем токен и убираем лишние символы
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    // Проверяем, есть ли токен или нет
    if (token) {

        try {

            // Расшифровываем токен
            const decoded = jwt.verify(token, 'secret')

            // Если смогли расшифровать токен
            req.userId = decoded._id
            next()

        } catch (err) {

            // Если не смогли расшифровать токен
            return res.status(403).json({
                message: 'Немає доступу',
            })
        }

    } else {
        return res.status(403).json({
            message: 'Немає доступу',
        })
    }

}