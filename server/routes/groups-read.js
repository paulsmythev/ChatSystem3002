module.exports = function(db, app) {
    app.get("/api/groups-read", function(req, res) {
        const collection = db.collection('groups');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
        });
    });
}