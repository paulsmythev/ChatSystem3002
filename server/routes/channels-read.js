module.exports = function(db, app) {
    app.get("/api/channels-read", function(req, res) {

        //Returns all channels in database
        const collection = db.collection('channels');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
            
        });
    });
}