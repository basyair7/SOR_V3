// memanggil library whatsapp-bot
const { Client, LocalAuth } = require("whatsapp-web.js");
const { getNumber } = require("./models");
const QRCore = require("qrcode-terminal");
const fs = require("fs");

// make uptimebot server
// const express = require("express");
// const app = express();

// let port = process.env.PORT || 3000;

// app.get("/", function (req, res){
//     res.send("Whatsapp-bot sudah online!");
// });

// app.listen(port, () => {
//     console.log(`Example app is listening on port http://localhost:${port}`);
// });

try {
    // membuat object client
    const client = new Client({
        restartOnAuthFail: true,
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-extensions'
            ],
        },
        authStrategy: new LocalAuth()
    });

    // memanggil fungsi object on untuk scan QRCode Bar Whatsapp
    client.on('qr', (qr) => {
        QRCore.generate(qr, { small: true });
    });

    // tampilkan pesan jika server telah terkoneksi ke nomor
    client.on('authenticated', () => {
        console.log("\n\n*****Authenticate*****\n\n");
    });

    // tampilkan pesan jika server gagal terkoneksi ke nomor
    client.on('auth_failure', (msg) => {
        console.log("\n\n*****Authenticate Error*****\n", msg, "\n");
    });

    // bot is ready => kirim pesan ke nomor pengguna (jika nomor pengguna tersedia di dalam database Real-Time)
    client.on('ready', () => {
        try {
            // mengambil nomor wa client di database
            getNumber((val) => {
                Object.keys(val).map(async key => {
                    // kirim pesan ke nomor client
                    var nomorHp = await val[key].numer;
                    if (nomorHp !== undefined) client.sendMessage(nomorHp, "Bot Smart Lamp Ready!");
                });
            });

        } catch (e) {
            console.error(e);
        } finally {
            console.log("Bot Ready...");
        }
    });

    // memuat pesan perintah, beralih ke program event/message.js
    fs.readdir("./src/events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach((file) => {
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    client.initialize();

    // disconnect server jika pada aplikasi telah logout dari server
    client.on('disconnected', () => {
        client.destroy();
        client.initialize();
    });

} catch (error) {
    console.error(error);
}