module.exports = function(db, app, ObjectID) {
    app.post("/api/groups-users", function(req, res){
        const collection = db.collection("groups_users");
        let group_id = req.body._id;

        //Returns all group user records from the group _id
        collection.find({group_id:group_id}).toArray((err, data)=> {
            res.send(data);
        });
        
    });
}