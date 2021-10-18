module.exports = function(db, app) {
    app.post("/api/users-create", function(req, res) {
        const collection = db.collection("users");

        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let role = req.body.role;
        let profilepicture = req.body.profilepicture;

        let nextId = 0;

        //verify username uniqueness
        collection.find({"username": username}).toArray((err, data) => {
            if (data.length > 0) {
                res.send({"userExists":true, "userCreated":false});

            } else {
                //Locates next user id
                collection.find({}, { _id: 1, array: { $slice: -1 } }).toArray(function(err, items){
                    nextId = items.length+1;
                    let insertUser = ({"_id":nextId, "email":email, "username":username, "password":password, "role":role, "profilepicture":profilepicture});

                    //Inserts new user
                    collection.insertOne(insertUser,(err, dbres)=>{
                        res.send({"userExists":false, "userCreated":true});

                    })
                });

            }
        });

        
        
    });

}