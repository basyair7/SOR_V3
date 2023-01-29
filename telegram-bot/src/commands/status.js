/*
* Program menampilkan informasi database ke client melalui aplikasi telegram
* 
*/

const db = require("../FirebaseDB");
const ref = require("../FirebaseDB/path/reference.json");
const { clock } = require("../models");

exports.run = async (client, msg) => {
    var status_switch_1;
    var status_switch_2;
    let id = msg.from.id;

    db.ref(ref['ref-2']).once(
        'value',
        snapshot => {
            if (snapshot.val() !== null) {
                var bool_switch_1 = snapshot.val()["switch-1"];
                var bool_switch_2 = snapshot.val()["switch-2"];

                if (bool_switch_1 === true) status_switch_1 = "Hidup";
                else if (bool_switch_1 === false) status_switch_1 = "Mati";
                if (bool_switch_2 === true) status_switch_2 = "Hidup";
                else if (bool_switch_2 === false) status_switch_2 = "Mati";

                var information = `\t**Status SmartLamp V3.0\nTanggal : ${ clock() }\n\nStatus Saklar\n>Saklar 1    : ${ status_switch_1 }\n>Saklar 2   : ${ status_switch_2 }`;

                client.sendMessage(id, information);
            } else;
        },
        err => {
            console.error(`Read Failed ${err.name}`);
        }
    )
}