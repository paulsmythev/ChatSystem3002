module.exports = function(db, app) {
    app.get("/api/groups-current", function(req, res) {

        //Checks user is authorised to preform action
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {

            if (data.length == 0) {
                res.send({"authError": true});
            } else {
                
                //Returns the groups a user is related to 
                const collection = db.collection('groups_users');
                collection.find({user_id:data[0]._id}).toArray((err, dataSub)=> {
                    res.send(dataSub);
                });

            }

        });

    });

}
