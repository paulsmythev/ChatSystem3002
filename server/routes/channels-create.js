module.exports = function(db, app) {
    app.post("/api/channels-create", function(req, res) {
        
        let group_id = req.body.group_id;
        let name = req.body.name;
        let createdBy_id = req.body.createdBy_id;
        let description = req.body.description;
        let groupPicture_id = req.body.groupPicture_id;
        let nextId = 0;

        const collectionCU = db.collection('current_user');
        collectionCU.find({}).toArray((err, dataCU)=> {

            const collection = db.collection("channels");
            collection.find({"name": name}).toArray((err, data) => {
                if (data.length > 0) {
                    res.send({"channelExists":true});
                    
                } else {
                    collection.find({}, { _id: 1, array: { $slice: -1 } }).toArray(function(err, items){
                        nextId = items.length+1;
    
                        let insertChannel = ({"_id":nextId, "group_id": group_id, "name": name, "createdBy_id": dataCU[0].username, "description": description, "groupPicture_id": groupPicture_id});
    
                        collection.insertOne(insertChannel,(err, dbres)=>{
                            res.send(dbres);
    
                        })
                    });
                }
            });
        });

    });
}