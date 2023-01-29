const { getMessage } = require("../models");
const {
    menu,
    status,
    switchs,
    botstatus,
} = require("../commands"); // call commands message

module.exports = async(client, msg) => {
    try {
        // command in whatsapp
        let messages = await msg.body.toLowerCase();

        // Check Commands in Database
        getMessage((data) => {
            Object.keys(data).map(async (key) => {
                // jika perintah client tersedia di database, maka jalankan file pada server
                if(messages === await data[key].q) {
                    if (messages === "menu" && messages === data[key].q 
                        || messages === "help" && messages === data[key].q) return menu.run(client, msg);

                    if (messages === "status" && messages === data[key].q 
                        || messages === "info" && messages === data[key].q) return status.run(client, msg);

                    if (messages === "bot status" && messages === data[key].q) return botstatus.run(client, msg);

                    else switchs.run(client, msg);
                    
                } else;
            });
        });
        
    } catch (e) {
        console.error(e);
    }
}