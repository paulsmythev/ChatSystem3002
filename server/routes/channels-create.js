module.exports = function(db, app) {
    app.post("/api/channels-create", function(req, res) {
        
        let group_id = req.body.group_id;
        let name = req.body.name;
        let description = req.body.description;
        let groupPicture_id = req.body.groupPicture_id;
        let nextId = 0;

        //Checks user is authorised to preform action
        const collectionCU = db.collection('current_user');
        collectionCU.find({}).toArray((err, dataCU)=> {

            if (dataCU[0].role == "User") {
                res.send({"authError": true});
            }

            //Check if channel name already exists
            const collection = db.collection("channels");
            collection.find({"name": name}).toArray((err, data) => {
                if (data.length > 0) {
                    res.send({"channelExists":true});
                    
                } else {
                    //Finds the last _id and adds it collection
                    collection.find({}, { _id: 1, array: { $slice: -1 } }).toArray(function(err, items){
                        nextId = items.length+1;
    
                        let insertChannel = ({"_id":nextId, "group_id": group_id, "name": name, "createdBy_id": dataCU[0].username, "description": description, "groupPicture_id": groupPicture_id});
    
                        //If all information is correct insert into collection
                        collection.insertOne(insertChannel,(err, dbres)=>{
                            res.send(dbres);
    
                        })
                    });
                }
            });
        });

    });
}