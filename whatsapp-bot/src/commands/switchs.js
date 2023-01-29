/*
* Program mengaktifkan saklar pada whatsapp-bot
* 
*/

const db = require("../FirebaseDB");
const ref = require("../FirebaseDB/path/reference.json");
const { getMessage } = require("../models");

exports.run = async (client, msg) => {
    try {
        let cmd = await msg.body.toLowerCase();

        getMessage((data) => {
            Object.keys(data).map(async (key) => {
                if (cmd === await data[key].q) {
                    if (cmd === "saklar 1 on" && data[key].q) db.ref(ref["ref-2"]).child("switch-1").set(true);
                    if (cmd === "saklar 1 off" && data[key].q) db.ref(ref['ref-2']).child("switch-1").set(false);
                    if (cmd === "saklar 2 on" && data[key].q) db.ref(ref['ref-2']).child("switch-2").set(true);
                    if (cmd === "saklar 2 off" && data[key].q) db.ref(ref['ref-2']).child("switch-2").set(false);
                    
                    else msg.reply(`${data[key].a}`);
                    
                } else;
            });
        });

    } catch (error) {
        console.error(error);
    }
}