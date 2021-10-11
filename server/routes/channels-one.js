module.exports = function(db, app, ObjectID) {
    app.post("/api/channels-one", function(req, res){
        const collection = db.collection("channels");
        let id = req.body._id;

        collection.find({group_id:id}).toArray((err, data)=> {
            res.send(data);
        });
        
    });
}