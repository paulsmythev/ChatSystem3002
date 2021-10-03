module.exports = function(db, app) {
    app.get("/api/groups-current", function(req, res) {

        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {

            const collection = db.collection('groups_users');
            collection.find({user_id:data[0]._id}).toArray((err, dataSub)=> {
                res.send(dataSub);
            });

        });

    });

}
