const botstatus = require("./botstatus"); // call command botstatus
const status = require("./status");
const menu = require("./menu");
const switchs = require("./switchs");

// aktifkan semua perintah bot ke dalam file index
module.exports = {
    botstatus,
    status,
    menu,
    switchs,
}