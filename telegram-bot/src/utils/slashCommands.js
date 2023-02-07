const {
    menu, 
    status,
    botstatus
} = require("../commands");
const db = require("../FirebaseDB");
const ref = require("../FirebaseDB/path/reference.json");

async function Server(server) {
    server.onText(/\/start/, async msg => {
        return await server.sendMessage(msg.from.id, "/help")
    });

    server.onText(/\/help/, (msg) => {
        return menu.run(server, msg);
    });
    
    server.onText(/\/menu/, (msg) => {
        return menu.run(server, msg);
    });

    server.onText(/\/status/, (msg) => {
        return status.run(server, msg);
    });

    server.onText(/\/info/, (msg) => {
        return status.run(server, msg);
    });

    server.onText(/\/botstatus/, (msg) => {
        return botstatus.run(server, msg);
    });

    server.onText(/\/saklar1on/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-1").set(true);
        return server.sendMessage(msg.from.id, "Saklar 1 on : OK");
    });
    
    server.onText(/\/saklar1off/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-1").set(false);
        return server.sendMessage(msg.from.id, "Saklar 1 off : OK");
    });

    server.onText(/\/saklar2on/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-2").set(true);
        return server.sendMessage(msg.from.id, "Saklar 2 on : OK");
    });

    server.onText(/\/saklar2off/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-2").set(false);
        return server.sendMessage(msg.from.id, "Saklar 2 off : OK");
    });

    server.onText(/\/allswitchon/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-1").set(true);
        await db.ref(ref['ref-2']).child("switch-2").set(true);
        return server.sendMessage(msg.from.id, "All switch on : OK");
    });

    server.onText(/\/allswitchoff/, async (msg) => {
        await db.ref(ref['ref-2']).child("switch-1").set(false);
        await db.ref(ref['ref-2']).child("switch-2").set(false);
        return server.sendMessage(msg.from.id, "All switch off : OK");
    });

    server.onText(/\/getlink/, async msg => {
        return await server.sendMessage(msg.from.id, "https://t.me/awpjsbot");
    });
}

module.exports = Server;
