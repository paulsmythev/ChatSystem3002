module.exports = function(db, app) {
    app.get("/api/channels-current", function(req, res) {

        //Get current logged in user
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {
            
            //Finds all groups user is associated with 
            const collection = db.collection('groups_users');
            collection.find({user_id:data[0]._id}).toArray((err, dataSub)=> {
                res.send(dataSub);
            });

        });

    });

}