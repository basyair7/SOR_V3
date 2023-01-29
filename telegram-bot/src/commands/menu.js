/*
* Program menampilkan menu perintah yang tersedia di dalam bot telegram
* 
*/

const { getMessage } = require("../models");

exports.run = (client, message) => {
    try {
        // get message
        let id = message.from.id;
        getMessage((message) => {
            var messages = "\n";
            let numbers = 1;
            let listMenu = '';
            let description = '';
            Object.keys(message).map(async key => {
                listMenu = message[key].menu;
                description = message[key].description;

                if (listMenu !== undefined && description !== undefined) return messages += `${numbers++}. ${listMenu}\t : ${description}\n`;
            });
            client.sendMessage(id, `**Daftar Menu Smart Lamp BOT** ${messages}`);
        });

    } catch (error) {
        console.error(error);
    }
}