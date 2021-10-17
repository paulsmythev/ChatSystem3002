const { channel } = require("diagnostics_channel");

module.exports = function(db, app) {
    app.post("/api/chatlog-channel", function(req, res) {

        let group_id = req.body.group_id;
        let channel_id = req.body.channel_id;

        const collection_groups = db.collection("groups");
        collection_groups.find({_id: group_id}).toArray((err, data_groups)=>{
            const collection_channels = db.collection("channels");
            collection_channels.find({_id: channel_id}).toArray((err, data_channels)=>{
                const collection_chatlog = db.collection("chatlogs");
                collection_chatlog.find({group_id:group_id, channel_id: channel_id}).toArray((err, data_chatlog)=>{

                    if (data_chatlog.length == 0) {
                        let formula = ({"group_id": group_id, "group_name": data_groups[0].name, "channel_id": channel_id, "channel_name": data_channels[0].name, 
                        "chatlog": [{"log_id": 1, "user_id": 1,"username": "Super", "timestamp": "10/6/2021, 1:36:53 PM", "message": "No one’s chatting yet, say something!", "profilepicture": "1.png", "imageStatus": true, "imageName":"test-pattern.png"}]});

                        collection_chatlog.insertOne(formula, (err, dbres)=>{
                            console.log(dbres);
                        });

                        res.send({"chatlogCreated":true});

                    } else {
                        res.send({"chatlogCreated":false});

                    }

                });

            });

        });

    });
}