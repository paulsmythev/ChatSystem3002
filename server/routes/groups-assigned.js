module.exports = function(db, app) {
    app.post("/api/groups-assigned", function(req, res) {

        //Joins a user to a group and related channels
        const collection = db.collection("groups_users");

        collection.find({"group_id":req.body.group_id, "user_id":req.body.user_id}).toArray((err, data)=> {
            if (data.length > 0) {
                res.send({"previousExists":true, "insertedData":false});

            } else {
                collection.insertOne((req.body),(err, dbres)=>{
                    res.send({"previousExists":false, "insertedData":true});
        
                })

            }

        });

    });

}