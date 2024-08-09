const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE vehicle (latitude REAL, longitude REAL, timestamp TEXT)");

    const stmt = db.prepare("INSERT INTO vehicle VALUES (?, ?, ?)");
    vehicleData.forEach(({ latitude, longitude, timestamp }) => {
        stmt.run(latitude, longitude, timestamp);
    });
    stmt.finalize();
});

module.exports = db;
