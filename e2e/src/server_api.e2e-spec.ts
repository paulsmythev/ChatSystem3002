import { browser, by, element } from "protractor";
var Request = require("request");

describe("Authentication - Server Side API Calls",function(){

    it("authLogin", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/auth-login",
            "body": JSON.stringify({
              "identification": "paul",
              "password": "123"
            })
        
        });
    });

    it("authLogout", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/auth-logout"
        });
    });

    it("authRead", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/auth-read"
        });
    });

});

describe("Users - Server Side API Calls",function(){

    it("usersCreate", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/users-create",
            "body": JSON.stringify({
              "email": "e2e@e2e",
              "username": "e2e_api",
              "password": "123",
              "role": "user",
              "profilepicture": "01.png"
            })
        
        });
    });

    it("usersRead", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/users-read"
        });
    });

    it("usersDelete", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/users-delete",
            "body": JSON.stringify({
              "_id": "2"
            })
        
        });
    });

    it("usersUpdate", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/users-update",
            "body": JSON.stringify({
              "_id": "3",
              "roleChange": "user"
            })
        
        });
    });

    it("usersOne", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/users-one",
            "body": JSON.stringify({
              "_id": "2"
            })
        
        });
    });

});

describe("Channels - Server Side API Calls",function(){

    it("channelsCreate", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-create",
            "body": JSON.stringify({
              "group_id": "10",
              "name": "e2e_api",
              "createdBy_id": "e2e",
              "description": "user",
              "groupPicture_id": "01.png"
            })
        
        });
    });

    it("channelsRead", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-read"
        });
    });

    it("channelsDelete", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-delete",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

    it("channelsCurrent", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-read"
        });
    });

    it("channelsOne", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-one",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

    it("channelsChannels", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/channels-channel",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

});

describe("Groups - Server Side API Calls",function(){

    it("groupsRead", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-read"
        });
    });

    it("groupsCreate", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-create",
            "body": JSON.stringify({
              "name": "e2e_api",
              "createdBy_id": "e2e",
              "description": "user",
              "groupPicture_id": "01.png"
            })
        
        });
    });

    it("groupsOne", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-one",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

    it("groupsAssigned", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-assigned",
            "body": JSON.stringify({
              "group_id": "9",
              "group_name": "e2e",
              "user_id": "666",
              "username": "e2e_api"
            })
        
        });
    });

    it("groupsDelete", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-delete",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

    it("groupsCurrent", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-current"
        });
    });

    it("groupUsers", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/groups-users",
            "body": JSON.stringify({
              "_id": "22"
            })
        
        });
    });

});

describe("Chat - Server Side API Calls",function(){

    it("chatRead", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/chat-read",
            "body": JSON.stringify({
              "group_id": "1",
              "channel_id": "1"
            })
        
        });
    });

    it("chatCreate", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/chat-create",
            "body": JSON.stringify({
              "group_id": "1",
              "channel_id": "1",
              "user_id": "22",
              "username": "E",
              "timestamp": "e2e",
              "message": "e2e testing",
              "profilepicture": "01.png",
              "imageStatus": "false",
              "imageName": ""
            })
        
        });
    });

    it("chatlogChannel", ()=>{
        Request.put({
            "headers": { "content-type": "application/json" },
            "url": "http://localhost:3000/api/chatlog-channel",
            "body": JSON.stringify({
              "group_id": "1",
              "channel_id": "1"
            })
        
        });
    });


});