module.exports = {
    connect: function(io, PORT) {
        var openChannels = [];
        io.on("connection",(socket) => {
            console.log("user connection on port " + PORT + " : " + socket.id);

            socket.on("message", (message)=> {
                io.emit("message", message);
            });

            socket.on("chatStart", (chat_id)=>{
                openChannels.push(chat_id);
            });

            console.log(openChannels);//openChannels
            
        });
        
    }
}