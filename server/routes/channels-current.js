module.exports = function(db, app) {
    app.post("/api/channels-current", function(req, res) {

        const collection = db.collection('groups_users');
        collection.find({user_id:req.body._id}).toArray((err, data)=> {

            for (let i = 0; i < data.length; i++) {
                const collection = db.collection('channels');
                collection.find({group_id:data[i].group_id}).toArray((err, data)=> {
                    res.send(data);
                    //console.log(data);
                    //console.log("<--------- BREAK --------->");

                });
            }

        });

    });
}
