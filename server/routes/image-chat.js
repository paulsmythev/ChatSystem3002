module.exports = function (app, formidable) {
    app.post("/api/image-chat", (req, res)=>{
        var form = new formidable.IncomingForm({uploadDir: "../src/assets/images/chatpics"});//"./userimages"
        form.KeepExtensions = true;

        //Uploads image that has been posted in  a chat room

        form.on("error", function(err) {
            throw err;
            res.send({
                result: "failed",
                data:{},
                numberofimages:0,
                message: "Cannot upload image. Error is :" + err
            });
        });

        form.on("fileBegin", function(name, file){
            file.path = form.uploadDir + "/" + file.name;
        });

        form.on("file", function(name, file){
            res.send({
                result: "OK",
                data:{"filename":file.name, "size": file.size},
                numberOfImages: 1,
                message: "upload success"
            });
        });

        form.parse(req);

    });
}
