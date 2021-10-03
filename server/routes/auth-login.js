module.exports = function(db, app) {
    app.post("/api/auth-login", function(req, res) {
        let identification = req.body.identification;
        let password = req.body.password;

        //force logged in user out
        db.collection("current_user").drop(function(err, delOK) {

        });

        const collection = db.collection("users");
        collection.find({"username":identification, "password":password}).toArray((err, data)=> {
            if (data.length > 0) {
                const collection = db.collection("current_user");
                collection.insertOne(data[0],(err, dbres)=>{
                    res.send({"userLogin":true});

                })
            } else {
                res.send({"userLogin":false});
            }
        });
        
    });
}