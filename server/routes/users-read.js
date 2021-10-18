module.exports = function(db, app) {
    app.get("/api/users-read", function(req, res) {

        //returns all users in collection
        const collection = db.collection('users');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
        });
    });
}