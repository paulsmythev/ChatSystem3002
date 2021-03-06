module.exports = function(db, app) {
    app.post("/api/chat-read", function(req, res) {
        
        //Returns the chat history depending on group and channel
        const collection = db.collection('chatlogs');
        collection.find({"group_id":req.body.group_id, "channel_id": req.body.channel_id}).toArray((err, data)=>{
            res.send(data);
        });
        
    });
}