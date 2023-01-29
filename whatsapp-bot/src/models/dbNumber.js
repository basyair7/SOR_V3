const firebase = require("../FirebaseDB");
const reference = require("../FirebaseDB/path/reference.json");

function getNumber(callback) {
    firebase.ref(reference['ref-3']).once(
        'value',
        (snapshot) => {
            if (snapshot.val() !== null) {
                callback(snapshot.val());
            } else;
        },
        (err) => {
            console.error(`Read Failed ${err.name}`);
        }
    );
}

module.exports = getNumber;