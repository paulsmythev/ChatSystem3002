module.exports = function(db, app, ObjectID) {
    app.post("/api/channels-delete", function(req, res){
        delete_id = req.body._id;

        //Checks user is authorised to preform action
        const collectionCU = db.collection('current_user');
        collectionCU.find({}).toArray((err, dataCU)=> {

            if (dataCU[0].role == "User") {
                res.send({"authError": true});
            }

            //Uses channel _id  to delete record
            const collection = db.collection("channels");
            collection.deleteOne({_id:delete_id}, (err, docs)=> {
                collection.find({}).toArray((err, data)=>{
                    res.send(data);
                });
            });


        });

    });
}