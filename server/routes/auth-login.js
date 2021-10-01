module.exports = function(db, app) {
    app.post("/api/auth-login", function(req, res) {
        let identification = req.body.identification;
        let password = req.body.password;

        const collection = db.collection("users");
        collection.find({"username":identification, "password":password}).toArray((err, data)=> {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.send({"userExists":false});
            }
        });
        
    });
}