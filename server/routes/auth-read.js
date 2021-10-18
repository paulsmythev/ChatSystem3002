module.exports = function(db, app) {
    app.get("/api/auth-read", function(req, res) {
        
        //Obtains current user details mostly about their role for use on client side
        const collection = db.collection('current_user');
        collection.find({}).toArray((err, data)=> {
            res.send(data);
        });
    });
}