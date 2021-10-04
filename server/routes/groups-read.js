module.exports = function(db, app) {
    app.get("/api/groups-read", function(req, res) {
        
        //Check user Level
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {
            
            if (data[0].role == "Super Administrator" || data[0].role == "Group Administrator") {
                const collection = db.collection('groups');
                collection.find({}).toArray((err, datasub)=> {
                    res.send(datasub);
                    
                });
            } else {
                res.send({"authenticationStatus":false});
            }

        });
    });
}