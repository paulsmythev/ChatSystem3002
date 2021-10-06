module.exports = function(db, app) {
    app.get("/api/chat-testing", function(req, res) {
        const collection = db.collection('chatlogs');
        collection.find({}).toArray((err, data)=> {
            let id = data[0]._id;
            let nextLog_id = data[0].chatlog.length + 1;
            let dateTime = new Date().toLocaleString();
            
            collection.updateOne({_id:id},{$push:{"chatlog":{"log_id": nextLog_id, "user_id": 2,"username": "Abby", "timestamp": dateTime, "message": "I love cats"}}},()=>{                
                collection.find({}).toArray((err, data)=> {
                    res.send(data);
                });
                
            });
        });

    });
}
/*
module.exports = function(db, app) {
    app.get("/api/chat-testing", function(req, res) {
        const collection = db.collection('chatlogs');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
        });
    });
}
*/