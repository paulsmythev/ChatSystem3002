module.exports = function(db, app) {
    app.post("/api/chat-history", function(req, res) {
        console.log(req.body);
        const collection = db.collection('chatlogs');
        collection.find({"group_id": req.body.group_id,"channel_id":req.body.channel_id}).toArray((err, data)=> {
            res.send(data);
        });
    });
}//({"username":identification, "password":password})