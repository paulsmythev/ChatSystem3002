module.exports = function(db, app) {
    app.post("/api/chat-create", function(req, res) {
        let group_id = req.body.group_id;
        let channel_id = req.body.channel_id;
        let user_id = req.body.user_id;
        let username = req.body.username;
        let timestamp = req.body.timestamp;
        let message = req.body.message;
        let profilepicture = req.body.profilepicture;
        let imageStatus = req.body.imageStatus;
        let imageName = req.body.imageName;

        //Creates the chat history when new messages are sent in the chat rooms
        //Checks user is authorised to preform action
        const collectionCU = db.collection('current_user');
        collectionCU.find({}).toArray((err, dataCU)=> {

            if (dataCU[0].role == "User") {
                res.send({"authError": true});
            } else {
                //Get next record _id
                const collection = db.collection('chatlogs');
                collection.find({group_id:group_id, channel_id: channel_id}).toArray((err, data)=> {
                    let id = data[0]._id;
                    let nextLog_id = data[0].chatlog.length + 1;
                    
                    //Inserts new record
                    collection.updateOne({group_id:group_id, channel_id: channel_id},{$push:{"chatlog":{"log_id": nextLog_id, "user_id": user_id,"username": username, "timestamp": timestamp, "message": message, "profilepicture":profilepicture, "imageStatus": imageStatus, "imageName": imageName}}},()=>{                
        
                    });
                });
            }
        });
    });
}