
module.exports = function(db, app, ObjectID) {
    app.post("/api/groups-one", function(req, res){
        const collection = db.collection("groups");
        let id = req.body._id;

        //Returns one group records based of group _id 
        collection.find({_id:id}).toArray((err, data)=> {
            res.send(data);
        });
        
    });
}