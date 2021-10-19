module.exports = function(db, app, ObjectID) {
    app.post("/api/groups-delete", function(req, res){
        delete_id = req.body._id;

        var myquery = {group_id:delete_id};
        db.collection("channels").deleteMany(myquery, function(err, obj) {

        });

        const collection = db.collection("groups");
        collection.deleteOne({_id:delete_id}, (err, docs)=> {
            collection.find({}).toArray((err, data)=>{
                res.send(data);
            });
        });
    });
}

