module.exports = function(db, app) {
    app.post("/api/chat-create", function(req, res) {
        let user_id = req.body.user_id;
        let username = req.body.username;
        let timestamp = req.body.timestamp;
        let message = req.body.message;
        let profilepicture = req.body.profilepicture;
        let imageStatus = req.body.imageStatus;
        let imageName = req.body.imageName;


        const collection = db.collection('chatlogs');
        collection.find({}).toArray((err, data)=> {
            let id = data[0]._id;
            let nextLog_id = data[0].chatlog.length + 1;
            
            collection.updateOne({_id:id},{$push:{"chatlog":{"log_id": nextLog_id, "user_id": user_id,"username": username, "timestamp": timestamp, "message": message, "profilepicture":profilepicture, "imageStatus": imageStatus, "imageName": imageName}}},()=>{                

            });
        });
    });
}