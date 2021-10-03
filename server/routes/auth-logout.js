module.exports = function(db, app) {
    app.get("/api/auth-logout", function(req, res) {
        db.collection("current_user").drop(function(err, delOK) {
            
        });
    });
}