module.exports = function(db, app, ObjectID) {
    app.post("/api/channels-delete", function(req, res){
        delete_id = req.body._id;

        const collection = db.collection("channels");
        
        collection.deleteOne({_id:delete_id}, (err, docs)=> {
            collection.find({}).toArray((err, data)=>{
                res.send(data);
            });
        });
    });
}