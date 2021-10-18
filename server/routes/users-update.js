module.exports = function(db, app, ObjectID) {
    app.post("/api/users-update", function(req, res){
        id = req.body._id;
        role = req.body.roleChange;

        const collection = db.collection("users");
        
        //Updates the role the user has been assigned
        collection.updateOne({_id:id},{$set:{role:role}},()=>{
            collection.find({}).toArray((err, data)=> {
                res.send(data);
            });
        });

    });
}