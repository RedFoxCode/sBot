# sBot

>Внимание! Для создания функционального бота на платформе sBot необходимы знания в языке программирования JavaScript и установленный Node.js

### Базовая настройка
Создайте в папке sBot файл `app.js`

Откройте его любым редактором, и вставьте туда следующий код:
```
const bot = require('./bot'); //Ядро бота
bot.init(['обращения','к боту','маленькими','буквами'],'access_token', 'rucaptcha_key');
bot.dict.import({
    'Тест': 'Привет, я sBot!',
    'Привет': 'Здравствуй!'
});
```
Для получения access_token читайте [Получение access_token](docs/getting_token.md)

`'rucaptcha_key'` - Ваш API ключ для сервиса распознавания капчи "RuCaptcha", необязательно

### Запуск бота
Для **Linux** перейдите в папку с sBot

Для **Windows** откройте папку sBot, нажмите правую кнопку мыши, удерживая Shift и выберите *Открыть окно команд*

Далее напишите `npm install && npm start`

*(Это установит необходимые пакеты и запустит бота)*

Теперь вы можете написать боту "Тест" в личные сообщения или "Обращение, тест" в беседе и он ответит вам "Привет, я sBot!". Аналогично с "Привет", на что будет ответ "Здравствуй!"

Чтобы узнать больше о настройке бота, читайте [Расширенная настройка бота](docs/advanced_setting.md)
