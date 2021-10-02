const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


//static file
app.use(express.static('public'))
app.use('css', express.static(__dirname + 'public/css'))
app.use('js', express.static(__dirname + 'public/js'))
app.use('image', express.static(__dirname + 'public/image'))

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/views/index.html'));
// });

app.get('view-engine','ejs')

app.get('/login', (req,res) =>{
    res.render('login.ejs')
})

app.listen(port);
console.log('Server started at http://localhost:' + port);

const Telegraf = require('telegraf');

const bot = new Telegraf('2002930870:AAHF_KPcoESLwloZlNXbIhumCP5g9TVFHKc');

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to Macrame Home.', {
    })
})

bot.hears('macrame', ctx => {
    console.log(ctx.from)
    let macrameMessage = `Here are pictures of macrames you would love`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, macrameMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "earing",
                        callback_data: 'earing'
                    },
                    {
                        text: "keychain",
                        callback_data: 'keychain'
                    }
                ],

            ]
        }
    })
})

//return earing image

bot.action('earing', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "public/image/ear5.jpg"
    })

})

//return keychain image

bot.action('keychain', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "public/image/key4.png"
    })

})

//request user's phone number

bot.hears('phone', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we get your phone number?', requestPhoneKeyboard);

})

//request user's location

bot.hears("location", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Can we access your location?', requestLocationKeyboard);
})

//constructor for providing phone number to the bot

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};
//constructor for proving location to the bot

const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }

}

bot.launch();