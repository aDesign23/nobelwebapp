const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-data', async (req, res) => {
    const { name, surname, fatherName, motherName, phoneNumber } = req.body;

    const message = `Ism: ${name}\nFamiliya: ${surname}\nOtasining ismi: ${fatherName}\nOnasining ismi: ${motherName}\nTelefon raqami: ${phoneNumber}`;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = "@NobelMedTashkiliy"; // o'zingizning telegram kanalingiz yoki chat ID

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const telegramResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        const telegramData = await telegramResponse.json();

        if (telegramData.ok) {
            res.status(200).send({ message: 'Ma`lumotlar muvaffaqiyatli yuborildi!' });
        } else {
            res.status(500).send({ message: 'Xato: Ma`lumotlar yuborilmadi.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Xato: Ma`lumotlar yuborilmadi.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
