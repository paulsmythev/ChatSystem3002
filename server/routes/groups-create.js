module.exports = function(db, app) {
    app.post("/api/groups-create", function(req, res) {

        //Collects and inserts a new group

        let nextId = 0;
        let name = req.body.name;
        let authuser = "";
        let description = req.body.description;
        let groupPicture_id = req.body.groupPicture_id;

        //Checks user is authorised to preform action
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {

            authuser = data[0].username

        //verify group name uniqueness
        const collection = db.collection("groups");
        collection.find({"name": name}).toArray((err, data) => {
            if (data.length > 0) {
                res.send({"groupsExists":true, "groupCreated":false});
                
            } else {
                //Checks group name is unique 
                collection.find({}, { _id: 1, array: { $slice: -1 } }).toArray(function(err, items){
                    nextId = items.length+1;
                    let insertGroup = ({"_id":nextId, "name":name, "createdBy_id":authuser, "description":description, "groupPicture_id":groupPicture_id});

                    //Inserts next record 
                    collection.insertOne(insertGroup,(err, dbres)=>{
                        res.send({"groupsExists":false, "groupCreated":true});

                    })

                });//end nested find

            }//end else

        });//end parent find
            
        });//current_user


    });//end app.post

}//module.exports