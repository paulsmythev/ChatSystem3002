module.exports = function(db, app) {
    app.get("/api/auth-read", function(req, res) {
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
        });
    });
}