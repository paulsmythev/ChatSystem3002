module.exports = function(db, app) {
    app.get("/api/auth-logout", function(req, res) {
        //Clears current user from collection
        db.collection("current_user").drop(function(err, delOK) {
            res.send({"loggedOut":true});
        });
    });
}