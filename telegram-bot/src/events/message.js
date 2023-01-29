const {
    menu, 
    status,
    switchs,
    botstatus
} = require("../commands");
const db = require("../FirebaseDB");
const ref = require("../FirebaseDB/path/reference.json");
const { getMessage } = require("../models");

module.exports = async(client, msg) => {
    try {
        // command in telegram
        let message = await msg.text.toLowerCase();
        let id = await msg.from.id;

        // Check Commands in Database
        getMessage((data) => {
            Object.keys(data).map(async (key) => {
                // jika perintah client tersedia di database, maka jalankan file pada server
                if (message === await data[key].q) {
                    if (message === "menu" && message === data[key].q 
                    || message === "help" && message === data[key].q) 
                        return menu.run(client, msg);

                    if (message === "status" && message === data[key].q
                    || message === "info" && message === data[key].q) 
                        return status.run(client, msg);

                    if (message === "bot status" && message === data[key].q) 
                        return botstatus.run(client, msg);

                    else switchs.run(client, msg);
                    
                } else;
            });
        });

    } catch (error) {
        console.error(error);
    }
}