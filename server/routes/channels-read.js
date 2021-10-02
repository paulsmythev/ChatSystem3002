module.exports = function(db, app) {
    app.get("/api/channels-read", function(req, res) {
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
            
        });
    });
}