require('dotenv').config();

const fs = require('fs');
const colors = require('colors');

const productJson = require('./src/data/product.json');

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_API_KEY;

const bot = new TelegramBot(token, { polling: true });

console.log('Started TelegramBot');

const getCategoryInlineKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Переглянути товари', callback_data: 'view_categories' }]
            ]
        }
    };
};

const getNumEmailInlineKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Придбати товари', callback_data: 'get_number_email' }]
            ]
        }
    };
};

const getReturnInlineKeyboard = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Повернутися до товарів', callback_data: 'get_return' }]
            ]
        }
    };
};

const getCategoryKeyboard = () => {
    return {
        reply_markup: {
            keyboard: [
                ['🔧Конструктори🏗️', '🏰Ігрові набори🎮'],
                ['📚Дитячі книги📗', '🧸М\'які іграшки🐰'],
                ['🧩Ігри та головоломки🎲', '🚴Активні ігри🤾‍♀️'],
                ['🧠Розвиваючі ігри🎨'],
                ['🛍️Аксесуари та додаткові товари🛍️'],
                ['🛒Мій кошик товарів🛒']
            ],
            resize_keyboard: true,
        },
    };
};


const funConstructorAvailabity = (index) => {
    return productJson.constructors[index].availability ? '✅В наявності' : '❌Немає в наявності'
};

const ifelConstructorRatin = (rating) => {
    let stars = ''
    for (let i = 0; i < rating; i++) {
        stars += '⭐️'
    }
    return stars
};

const categories = [
    {
        name: 'Категория 1',
        products: productJson.constructors.slice(0, 5)
    },
    {
        name: 'Категория 2',
        products: productJson.playSets.slice(0, 5)
    },
    {
        name: 'Категория 3',
        products: productJson.books.slice(0, 5)
    },
    {
        name: 'Категория 4',
        products: productJson.softToys.slice(0, 5)
    },
    {
        name: 'Категория 5',
        products: productJson.gamesAndPuzzles.slice(0, 5)
    },
    {
        name: 'Категория 6',
        products: productJson.activeGames.slice(0, 5)
    },
    {
        name: 'Категория 7',
        products: productJson.developmentalGames.slice(0, 5)
    },
    {
        name: 'Категория 8',
        products: productJson.accessoriesAdditionalProducts.slice(0, 5)
    },
];

const products = [];

for (const category of categories) {
    for (let i = 0; i < category.products.length; i++) {
        const product = category.products[i];

        products.push({
            name: product.name,
            description: product.description,
            additionalProperties: product.additionalProperties,
            price: product.price,
            availability: funConstructorAvailabity(i),
            manufacturer: product.manufacturer,
            size: product.size,
            weight: product.weight,
            kidsLike: product.kidsLike,
            rating: ifelConstructorRatin(product.rating),
            quantity: 0,
            category: category.name
        });
    }
};

let cart = [];

function getProductButtons(product) {
    return [
        [
            { text: '➖', callback_data: `decrement_${product.name}` },
            { text: product.quantity, callback_data: 'quantity_placeholder' },
            { text: '➕', callback_data: `increment_${product.name}` }
        ],
        [{ text: 'Додати до кошика', callback_data: `add_to_cart_${product.name}` }]
    ];
};

bot.setMyCommands([
    { command: '/start', description: 'Запустити бот' },
    { command: '/my_cart', description: 'Мій кошик товарів' },
]);

const start = () => {

    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;

        console.log('Бот запущен')

        const linkToMyWebsite = '<a href="https://www.google.com.ua">СЮДИ</a>'
        const welcomeText = 'Ласкаво просимо в <b>🌈Rainbow game world🧸</b> - інтернет-магазин дитячих іграшок!\n\n' +
            '🌟Тут ви знайдете широкий асортимент якісних і захопливих іграшок для дітей різного віку. Наш бот готовий допомогти вам з вибором і оформленням замовлення🌟\n\n' +
            '✨Просто оберіть, що вас цікавить, і наш бот надасть вам інформацію про доступні товари, ціни та можливості доставки✨\n\n' +
            '<b>Ми раді вітати вас у 🌈Rainbow game world🧸</b>\n\n' +
            `<i>Також, якщо ви віддаєте перевагу способу покупки через сайт, ви можете просто натиснути </i>🌈${linkToMyWebsite}🧸`

        await bot.sendSticker(chatId, './src/img/stickers-bear/admire.webp')
        await bot.sendMessage(chatId, welcomeText, { ...getCategoryInlineKeyboard(), parse_mode: 'HTML' });
    });

    bot.onText(/\/my_cart/, async (msg) => {
        const chatId = msg.chat.id;

        let cartText = '🌈<b>Ось ваш кошик</b>🧸:\n\n';
        if (cart.length > 0) {
            for (const item of cart) {
                cartText += `${item.name} - ${item.price} грн\nКількість: ${item.quantity} шт.\n\n`;
            }
            await bot.sendMessage(chatId, cartText, { ...getNumEmailInlineKeyboard(), parse_mode: 'HTML' });
        } else {
            await bot.sendMessage(chatId, `${cartText} Ваш кошик порожній`, { parse_mode: 'HTML' });
        }

    });

    let isWaitingForContacts = false;

    bot.on('callback_query', (callbackQuery) => {
        const chatId = callbackQuery.message.chat.id;
        const messageId = callbackQuery.message.message_id;

        if (callbackQuery.data === 'view_categories') {
            const productsText = '🌈<b>Чудово, виберіть розділ, який вас цікавить</b>🧸:\n\n' +
                '🔧<b>Конструктори</b>🏗️ - Можливість збирати і створювати різні моделі та форми.\n\n' +
                '🏰<b>Ігрові набори</b>🎮 - Захоплюючі комплекти для веселих ігор і пригод.\n\n' +
                '📚<b>Дитячі книжки</b>📗 - Чудові історії та навчальні матеріали для маленьких читачів.\n\n' +
                '🧸<b>М\'які іграшки</b>🐰 - Приємні на дотик плюшеві товари для обіймашок та ігор.\n\n' +
                '🧩<b>Ігри та головоломки</b>🎲 - Розумові та логічні завдання для розвитку інтелекту.\n\n' +
                '🚴<b>Активні ігри</b>🤾‍♀️ - Енергійні ігри для активного проведення часу та спортивних занять.\n\n' +
                '🧠<b>Розвиваючі ігри</b>🎨 - Ігри, що сприяють розвитку логіки, уяви та творчих навичок.\n\n' +
                '🛍️<b>Аксесуари та додаткові товари</b>🛍️ - Різноманітні доповнення та аксесуари для ще більшого задоволення від ігор і творчості.\n\n'

            bot.sendMessage(chatId, productsText, { ...getCategoryKeyboard(), parse_mode: 'HTML' });
            bot.answerCallbackQuery(callbackQuery.id);
        } else if (callbackQuery.data.startsWith('view_category_')) {
            const categoryId = callbackQuery.data.split('_')[2];
            const categoryProducts = products.filter(p => p.category === `Категория ${categoryId}`);

            for (const product of categoryProducts) {
                const text = `${product.name}, ${product.price}`;
                const buttons = getProductButtons(product);

                bot.sendMessage(chatId, text, { reply_markup: { inline_keyboard: buttons }, reply_to_message_id: messageId });
            }
        } else if (callbackQuery.data.startsWith('increment_')) {
            const productName = callbackQuery.data.split('_')[1];
            const product = products.find(p => p.name === productName);

            if (product) {
                product.quantity += 1;
                const buttons = getProductButtons(product);

                bot.editMessageReplyMarkup({ inline_keyboard: buttons }, { chat_id: chatId, message_id: messageId });
                bot.answerCallbackQuery(callbackQuery.id);
            }
        } else if (callbackQuery.data.startsWith('decrement_')) {
            const productName = callbackQuery.data.split('_')[1];
            const product = products.find(p => p.name === productName);

            if (product && product.quantity > 0) {
                product.quantity -= 1;
                const buttons = getProductButtons(product);

                bot.editMessageReplyMarkup({ inline_keyboard: buttons }, { chat_id: chatId, message_id: messageId });
                bot.answerCallbackQuery(callbackQuery.id);
            }
        } else if (callbackQuery.data.startsWith('add_to_cart_')) {
            const productName = callbackQuery.data.split('_')[3];
            const product = products.find(p => p.name === productName);

            if (product && product.quantity > 0) {
                const existingCartItem = cart.find(item => item.name === product.name);

                if (existingCartItem) {
                    existingCartItem.quantity += product.quantity;
                } else {
                    const cartItem = {
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity
                    };

                    cart.push(cartItem);
                }

                product.quantity = 0;

                bot.sendMessage(chatId, `Товар 🌈<b>${product.name}</b>🧸 доданий до кошика.`, { parse_mode: 'HTML' });
                bot.answerCallbackQuery(callbackQuery.id);

            }
        } else if (callbackQuery.data === 'get_number_email') {
            const productsText = 'Будь ласка, введіть ваш ✉️<b>Email</b>✉️ або 📞<b>номер телефону</b>📞\n\n' +
                '🌈<b>Ми зв\'яжемося з вами для уточнення деталей вашої покупки та адреси доставки</b>🧸\n\n' +
                '<i>Те, що ви напишете, буде надіслано нашому працівнику</i>'

            isWaitingForContacts = true;
            bot.sendMessage(chatId, productsText, { parse_mode: 'HTML' });
            bot.answerCallbackQuery(callbackQuery.id);

        } else if (callbackQuery.data === 'get_return') {

            const productsText = '🌈<b>Чудово, виберіть розділ, який вас цікавить</b>🧸:\n\n' +
                '🔧<b>Конструктори</b>🏗️ - Можливість збирати і створювати різні моделі та форми.\n\n' +
                '🏰<b>Ігрові набори</b>🎮 - Захоплюючі комплекти для веселих ігор і пригод.\n\n' +
                '📚<b>Дитячі книжки</b>📗 - Чудові історії та навчальні матеріали для маленьких читачів.\n\n' +
                '🧸<b>М\'які іграшки</b>🐰 - Приємні на дотик плюшеві товари для обіймашок та ігор.\n\n' +
                '🧩<b>Ігри та головоломки</b>🎲 - Розумові та логічні завдання для розвитку інтелекту.\n\n' +
                '🚴<b>Активні ігри</b>🤾‍♀️ - Енергійні ігри для активного проведення часу та спортивних занять.\n\n' +
                '🧠<b>Розвиваючі ігри</b>🎨 - Ігри, що сприяють розвитку логіки, уяви та творчих навичок.\n\n' +
                '🛍️<b>Аксесуари та додаткові товари</b>🛍️ - Різноманітні доповнення та аксесуари для ще більшого задоволення від ігор і творчості.\n\n'

            bot.sendMessage(chatId, productsText, { ...getCategoryKeyboard(), parse_mode: 'HTML' });
            bot.answerCallbackQuery(callbackQuery.id);
        }
    });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id

        switch (msg.text) {

            case '🔧Конструктори🏗️':
                const chatId1 = msg.chat.id;
                const categoryId1 = 1;
                const categoryProducts1 = products.filter(p => p.category === `Категория ${categoryId1}`);

                const arrConstructorText = '🔧<b>Конструктори🏗️ чудовий вибір!</b>\n\n' +
                    '🌈Ось Конструктори, які можна купити в нашому магазині🧸:'

                const arrConstructorImg = [
                    './src/img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox.jpg',
                    './src/img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse.jpg',
                    './src/img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag.jpg',
                    './src/img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet.jpg',
                    './src/img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks.jpg',
                ]
                const arrConstructorImgBox = [
                    './src/img/product/constructors/LEGO-LEGOClassicLargeCreativeBrickBox2.jpg',
                    './src/img/product/constructors/Playmobil-PlaymobilCityLifeModernHouse2.jpg',
                    './src/img/product/constructors/MegaBloks-MegaBloksFirstBuildersBigBuildingBag2.jpg',
                    './src/img/product/constructors/KNEX-KNEXThrillRidesBionicBlastRollerCoasterBuildingSet2.jpg',
                    './src/img/product/constructors/Magformers-MagformersRainbowMagneticBuildingBlocks2.jpg',
                ]

                await bot.sendMessage(chatId1, arrConstructorText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts1.length; i++) {

                    const product1 = categoryProducts1[i];

                    const text1 = `🌈<b>${product1.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product1.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product1.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product1.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product1.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product1.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product1.size + '\n' +
                        '<b>Вага:</b> ' + product1.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product1.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product1.rating;

                    const buttons1 = getProductButtons(product1);

                    const imgIndex = i % arrConstructorImg.length;
                    const imgBoxIndex = i % arrConstructorImgBox.length;

                    await bot.sendMediaGroup(chatId1, [
                        { type: 'photo', media: arrConstructorImg[imgIndex] },
                        { type: 'photo', media: arrConstructorImgBox[imgBoxIndex] },
                    ], { reply_markup: { inline_keyboard: buttons1 } });

                    await bot.sendMessage(chatId1, text1, { reply_markup: { inline_keyboard: buttons1 }, parse_mode: 'HTML' });
                }

                break;

            case '🏰Ігрові набори🎮':
                const chatId2 = msg.chat.id;
                const categoryId2 = 2;
                const categoryProducts2 = products.filter(p => p.category === `Категория ${categoryId2}`);

                const arrPlaySetsText = '🏰<b>Ігрові набори🎮 чудовий вибір!</b>\n\n' +
                    '🌈Ось Ігрові набори, які можна купити в нашому магазині🧸:'
                const arrPlaySetsImg = [
                    './src/img/product/playSets/Step2-KidsPlayKitchenSet.jpg',
                    './src/img/product/playSets/Melissa&Doug-DoctorPretendPlaySet.jpg',
                    './src/img/product/playSets/LittleTikes-ToyGroceryStoreSet.jpg',
                    './src/img/product/playSets/LEGO-ConstructionToySet.jpg',
                    './src/img/product/playSets/Playmobil-PirateAdventurePlayset.jpg',
                ]
                const arrPlaySetsImgBox = [
                    './src/img/product/playSets/Step2-KidsPlayKitchenSet2.jpg',
                    './src/img/product/playSets/Melissa&Doug-DoctorPretendPlaySet2.jpg',
                    './src/img/product/playSets/LittleTikes-ToyGroceryStoreSet2.jpg',
                    './src/img/product/playSets/LEGO-ConstructionToySet2.jpg',
                    './src/img/product/playSets/Playmobil-PirateAdventurePlayset2.jpg',
                ]

                await bot.sendMessage(chatId2, arrPlaySetsText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts2.length; i++) {

                    const product2 = categoryProducts2[i];

                    const text2 = `🌈<b>${product2.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product2.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product2.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product2.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product2.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product2.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product2.size + '\n' +
                        '<b>Вага:</b> ' + product2.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product2.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product2.rating;

                    const buttons2 = getProductButtons(product2);

                    const imgIndex = i % arrPlaySetsImg.length;
                    const imgBoxIndex = i % arrPlaySetsImgBox.length;

                    await bot.sendMediaGroup(chatId2, [
                        { type: 'photo', media: arrPlaySetsImg[imgIndex] },
                        { type: 'photo', media: arrPlaySetsImgBox[imgBoxIndex] },
                    ], { reply_markup: { inline_keyboard: buttons2 } });

                    await bot.sendMessage(chatId2, text2, { reply_markup: { inline_keyboard: buttons2 }, parse_mode: 'HTML' });
                }

                break;

            case '📚Дитячі книги📗':
                const chatId3 = msg.chat.id;
                const categoryId3 = 3;
                const categoryProducts3 = products.filter(p => p.category === `Категория ${categoryId3}`);

                const arrBooksText = '📚<b>Дитячі книги📗 чудовий вибір!</b>\n\n' +
                    '🌈Ось Дитячі книги, які можна купити в нашому магазині🧸:'
                const arrBooksImg = [
                    './src/img/product/books/Ababagakamaga-HarryPotterAndThePhilosophersStone.jpg',
                    './src/img/product/books/Kredo-Teremok.jpg',
                    './src/img/product/books/Ababagakamaga-CharlieAndTheChocolateFactory.jpg',
                    './src/img/product/books/Ranok-PinocchiosAdventures.jpg',
                    './src/img/product/books/Folio-TheLittlePrince.png',
                ]

                await bot.sendMessage(chatId3, arrBooksText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts3.length; i++) {

                    const product3 = categoryProducts3[i];

                    const text3 = `🌈<b>${product3.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product3.description + '\n\n' +
                        '<b>Ціна:</b> ' + product3.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product3.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product3.manufacturer + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product3.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product3.rating;

                    const buttons3 = getProductButtons(product3);

                    const imgIndex = i % arrBooksImg.length;

                    await bot.sendMediaGroup(chatId3, [
                        { type: 'photo', media: arrBooksImg[imgIndex] },
                    ], { reply_markup: { inline_keyboard: buttons3 } });

                    await bot.sendMessage(chatId3, text3, { reply_markup: { inline_keyboard: buttons3 }, parse_mode: 'HTML' });
                }

                break;

            case '🧸М\'які іграшки🐰':
                const chatId4 = msg.chat.id;
                const categoryId4 = 4;
                const categoryProducts4 = products.filter(p => p.category === `Категория ${categoryId4}`);

                const arrSoftToysText = '🧸<b>М\'які іграшки🐰 чудовий вибір!</b>\n\n' +
                    '🌈Ось М\'які іграшки, які можна купити в нашому магазині🧸:'
                const arrSoftToysImg = [
                    './src/img/product/softToys/AURORA-TeddyBear.jpg',
                    './src/img/product/softToys/HelloKitty-HelloKittyPlushToy.jpg',
                    './src/img/product/softToys/Disney-DisneysMickeyMousePlush.jpg',
                    './src/img/product/softToys/TY-PawPatrolPlushToy.jpg',
                    './src/img/product/softToys/Disney-ElsaPlushDoll.jpg',
                ]

                await bot.sendMessage(chatId4, arrSoftToysText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts4.length; i++) {

                    const product4 = categoryProducts4[i];

                    const text4 = `🌈<b>${product4.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product4.description + '\n\n' +
                        '<b>Ціна:</b> ' + product4.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product4.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product4.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product4.size + '\n' +
                        '<b>Вага:</b> ' + product4.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product4.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product4.rating;

                    const buttons4 = getProductButtons(product4);

                    const imgIndex = i % arrSoftToysImg.length;

                    await bot.sendMediaGroup(chatId4, [
                        { type: 'photo', media: arrSoftToysImg[imgIndex] },
                    ], { reply_markup: { inline_keyboard: buttons4 } });

                    await bot.sendMessage(chatId4, text4, { reply_markup: { inline_keyboard: buttons4 }, parse_mode: 'HTML' });
                }

                break;

            case '🧩Ігри та головоломки🎲':
                const chatId5 = msg.chat.id;
                const categoryId5 = 5;
                const categoryProducts5 = products.filter(p => p.category === `Категория ${categoryId5}`);

                const arrGamesAndPuzzlesText = '🧩<b>Ігри та головоломки🎲 чудовий вибір!</b>\n\n' +
                    '🌈Ось Ігри та головоломки, які можна купити в нашому магазині🧸:'
                const arrGamesAndPuzzlesImg = [
                    './src/img/product/gamesAndPuzzles/Mattel-UNO.jpg',
                    './src/img/product/gamesAndPuzzles/Rubiks-RubiksCube3x3.jpg',
                    './src/img/product/gamesAndPuzzles/DaysOfWonder-TicketToRideFirstJourney.jpg',
                    './src/img/product/gamesAndPuzzles/Hasbro-MonopolyJunior.jpg',
                    './src/img/product/gamesAndPuzzles/LEGO-LEGOFriendsCafeHeartlakeCity.jpg',
                ]
                const arrGamesAndPuzzlesImgBox = [
                    './src/img/product/gamesAndPuzzles/Mattel-UNO2.jpg',
                    './src/img/product/gamesAndPuzzles/Rubiks-RubiksCube3x32.jpg',
                    './src/img/product/gamesAndPuzzles/DaysOfWonder-TicketToRideFirstJourney2.jpg',
                    './src/img/product/gamesAndPuzzles/Hasbro-MonopolyJunior2.jpg',
                    './src/img/product/gamesAndPuzzles/LEGO-LEGOFriendsCafeHeartlakeCity2.jpg',
                ]

                await bot.sendMessage(chatId5, arrGamesAndPuzzlesText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts5.length; i++) {

                    const product5 = categoryProducts5[i];

                    const text5 = `🌈<b>${product5.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product5.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product5.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product5.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product5.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product5.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product5.size + '\n' +
                        '<b>Вага:</b> ' + product5.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product5.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product5.rating;

                    const buttons5 = getProductButtons(product5);

                    const imgIndex = i % arrGamesAndPuzzlesImg.length;
                    const imgBoxIndex = i % arrGamesAndPuzzlesImgBox.length;

                    await bot.sendMediaGroup(chatId5, [
                        { type: 'photo', media: arrGamesAndPuzzlesImg[imgIndex] },
                        { type: 'photo', media: arrGamesAndPuzzlesImgBox[imgBoxIndex] },
                    ], { reply_markup: { inline_keyboard: buttons5 } });

                    await bot.sendMessage(chatId5, text5, { reply_markup: { inline_keyboard: buttons5 }, parse_mode: 'HTML' });
                }

                break

            case '🚴Активні ігри🤾‍♀️':
                const chatId6 = msg.chat.id;
                const categoryId6 = 6;
                const categoryProducts6 = products.filter(p => p.category === `Категория ${categoryId6}`);

                const arrActiveGamesText = '🚴<b>Активні ігри🤾‍♀️ чудовий вибір!</b>\n\n' +
                    '🌈Ось Активні ігри, які можна купити в нашому магазині🧸:'
                const arrActiveGamesImg = [
                    './src/img/product/activeGames/Strider-Bicycle.jpg',
                    './src/img/product/activeGames/Razor-Scooter.jpeg',
                    './src/img/product/activeGames/Rollerblade-Rollers.jpg',
                    './src/img/product/activeGames/Adidas-Ball.jpg',
                    './src/img/product/activeGames/SportBaby-SportsComplex.jpg',
                ]

                await bot.sendMessage(chatId6, arrActiveGamesText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts6.length; i++) {

                    const product6 = categoryProducts6[i];

                    const text6 = `🌈<b>${product6.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product6.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product6.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product6.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product6.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product6.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product6.size + '\n' +
                        '<b>Вага:</b> ' + product6.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product6.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product6.rating;

                    const buttons6 = getProductButtons(product6);

                    const imgIndex = i % arrActiveGamesImg.length;

                    await bot.sendMediaGroup(chatId6, [
                        { type: 'photo', media: arrActiveGamesImg[imgIndex] },
                    ], { reply_markup: { inline_keyboard: buttons6 } });

                    await bot.sendMessage(chatId6, text6, { reply_markup: { inline_keyboard: buttons6 }, parse_mode: 'HTML' });
                }

                break

            case '🧠Розвиваючі ігри🎨':
                const chatId7 = msg.chat.id;
                const categoryId7 = 7;
                const categoryProducts7 = products.filter(p => p.category === `Категория ${categoryId7}`);

                const arrDevelopmentalGamesText = '🧠<b>Розвиваючі ігри🎨 чудовий вибір!</b>\n\n' +
                    '🌈Ось Розвиваючі ігри, які можна купити в нашому магазині🧸:'
                const arrDevelopmentalGamesImg = [
                    './src/img/product/developmentalGames/LEGOGroup-DevelopmentConstructorLEGODuplo.jpg',
                    './src/img/product/developmentalGames/Ravensburger-EarningGameLogicCube.jpg',
                    './src/img/product/developmentalGames/Hasbro-PlayDohCreationKit.jpg', //TODO: Размер не такой какой надо
                    './src/img/product/developmentalGames/Melissa&Doug-LearningGameLettersAndNumbers.jpg',
                    './src/img/product/developmentalGames/DiscoveryKids-DiscoveryKidsNatureStudyKit.jpg',
                ]
                const arrDevelopmentalGamesImgBox = [
                    './src/img/product/developmentalGames/LEGOGroup-DevelopmentConstructorLEGODuplo2.jpg',
                    './src/img/product/developmentalGames/Ravensburger-EarningGameLogicCube2.jpg',
                    './src/img/product/developmentalGames/Hasbro-PlayDohCreationKit2.jpg', //TODO: Размер не такой какой надо
                    './src/img/product/developmentalGames/Melissa&Doug-LearningGameLettersAndNumbers2.jpg',
                    './src/img/product/developmentalGames/DiscoveryKids-DiscoveryKidsNatureStudyKit2.jpg',
                ]

                await bot.sendMessage(chatId7, arrDevelopmentalGamesText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts7.length; i++) {

                    const product7 = categoryProducts7[i];

                    const text7 = `🌈<b>${product7.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product7.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product7.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product7.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product7.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product7.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product7.size + '\n' +
                        '<b>Вага:</b> ' + product7.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product7.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product7.rating;

                    const buttons7 = getProductButtons(product7);

                    const imgIndex = i % arrDevelopmentalGamesImg.length;
                    const imgBoxIndex = i % arrDevelopmentalGamesImgBox.length;

                    await bot.sendMediaGroup(chatId7, [
                        { type: 'photo', media: arrDevelopmentalGamesImg[imgIndex] },
                        { type: 'photo', media: arrDevelopmentalGamesImgBox[imgBoxIndex] },
                    ], { reply_markup: { inline_keyboard: buttons7 } });

                    await bot.sendMessage(chatId7, text7, { reply_markup: { inline_keyboard: buttons7 }, parse_mode: 'HTML' });
                }

                break

            case '🛍️Аксесуари та додаткові товари🛍️':
                const chatId8 = msg.chat.id;
                const categoryId8 = 8;
                const categoryProducts8 = products.filter(p => p.category === `Категория ${categoryId8}`);

                const arrAccessoriesAdditionalProductsText = '🛍️<b>Аксесуари та додаткові товари🛍️ чудовий вибір!</b>\n\n' +
                    '🌈Ось Аксесуари та додаткові товари, які можна купити в нашому магазині🧸:'
                const arrAccessoriesAdditionalProductsImg = [
                    './src/img/product/accessoriesAdditionalPproducts/SkipHop-PuzzleMat.jpg',
                    './src/img/product/accessoriesAdditionalPproducts/Decowall-WallDecorationFairyTaleForest.jpg',
                    './src/img/product/accessoriesAdditionalPproducts/IKEA-ToyBasket.jpg',
                    './src/img/product/accessoriesAdditionalPproducts/Step2-TableChair.jpg',
                    './src/img/product/accessoriesAdditionalPproducts/CloudB-StarrySkyNightLamp.jpg',
                ]

                await bot.sendMessage(chatId8, arrAccessoriesAdditionalProductsText, { parse_mode: 'HTML' });

                for (let i = 0; i < categoryProducts8.length; i++) {

                    const product8 = categoryProducts8[i];

                    const text8 = `🌈<b>${product8.name}</b>🧸` + '\n\n' +
                        '💬<b>Опис:</b> ' + product8.description + '\n\n' +
                        '💭<b>Дод інформація:</b> ' + product8.additionalProperties + '\n\n' +
                        '<b>Ціна:</b> ' + product8.price + ' грн' + '\n\n' +
                        '<b>Наявність:</b> ' + product8.availability + '\n\n' +
                        '<b>Виробник:</b> ' + product8.manufacturer + '\n' +
                        '<b>Розмір:</b> ' + product8.size + '\n' +
                        '<b>Вага:</b> ' + product8.weight + '\n\n' +
                        '🧸<b>Сподобається дітям:</b> ' + product8.kidsLike + '\n\n' +
                        '<b>Рейтинг:</b> ' + product8.rating;

                    const buttons8 = getProductButtons(product8);

                    const imgIndex = i % arrAccessoriesAdditionalProductsImg.length;

                    await bot.sendMediaGroup(chatId8, [
                        { type: 'photo', media: arrAccessoriesAdditionalProductsImg[imgIndex] },
                    ], { reply_markup: { inline_keyboard: buttons8 } });

                    await bot.sendMessage(chatId8, text8, { reply_markup: { inline_keyboard: buttons8 }, parse_mode: 'HTML' });
                }

                break

            case '🛒Мій кошик товарів🛒':
                const chatId = msg.chat.id;

                let cartText = '🌈<b>Ось ваш кошик</b>🧸:\n\n';
                if (cart.length > 0) {
                    for (const item of cart) {
                        cartText += `${item.name} - ${item.price} грн\nКількість: ${item.quantity} шт.\n\n`;
                    }
                    await bot.sendMessage(chatId, cartText, { ...getNumEmailInlineKeyboard(), parse_mode: 'HTML' });
                } else {
                    await bot.sendMessage(chatId, `${cartText} Ваш кошик порожній`, { parse_mode: 'HTML' });
                }

                break;

            default:
                if (msg.text !== '/start' && msg.text !== '/my_cart') {

                    // bot.sendMessage(chatId, '🌈<b>Будь ласка, виберіть одну із запропонованих категорій товарів</b>🧸', { ...getCategoryInlineKeyboard(), parse_mode: 'HTML' })
                }
                break;
        }
    })

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        function isValidEmail(email) {
            const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return re.test(String(email).toLowerCase());
        }

        function isValidPhone(phone) {
            const re = /^\+?[\d()-]{10,15}$/;
            return re.test(phone);
        }

        if (isWaitingForContacts) {

            if (isValidEmail(text) || isValidPhone(text)) {

                await bot.sendMessage(chatId, '✅Дякую за покупку, ждіть дзвінка або смс', { ...getReturnInlineKeyboard(), parse_mode: 'HTML' });

                const user_data_file = 'user_data_file.txt'

                const userData =
                    `First name: ${msg.from.first_name}\n` +
                    ` Last name: ${msg.from.last_name}\n` +
                    `  Username: @${msg.from.username}\n` +
                    `     Wrote: ${msg.text}\n\n`;

                fs.appendFile(user_data_file, userData, (err) => {
                    if (err) {
                        console.log('✅ Помилка під час запису даних у файл ✅: '.bold.green, err)
                    } else {
                        console.log('✅ УСЕ ЗАПИСАЛОСЯ ✅'.bold.green)
                    }
                })

                isWaitingForContacts = false;
                cart = [];

            } else {

                await bot.sendMessage(chatId, '<b>Помилка: введені неправильні дані</b>😢\n\n' +
                    'Будь ласка, введіть коректний ✉️<b>Email</b>✉️ або 📞<b>номер телефону</b>📞 телефону.', { parse_mode: 'HTML' });
            }
        }

    });

    bot.on('polling_error', (error) => {
        console.error('Polling error:', error);
    });

};

start();