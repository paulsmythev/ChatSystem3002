module.exports = function(db, app, ObjectID) {
    app.post("/api/users-one", function(req, res){
        const collection = db.collection("users");
        let id = req.body._id;

        collection.find({_id: id}).toArray((err, data)=> {
            res.send(data);
        });
        
    });
}