# Chat System 3002 <img src="src/assets/images/5027877_bubble_chat_communication_interaction_online%20chat_icon.png" width="64px" height="64px" />

Paul Smyth S5012116 - 3813ICT Trimester 2 2021 - Assignment Phase 2

## Git Repository 

The majority of the project was developed using local repository’s that were pushed to the remote repository at either a major millstone or a at the end of day. Branch’s where used to represent different versions of the project with each being merge with the master once complete.

## Data Structures

The data structures are represented within the Mongo database collections accessed on the  server side. In total there are 6 listed below detailing their purpose,

- Current_user – stores the current logged in user, accessible to both server and client.
- Users – stores all users for the project and prevents adding a new user that has the same username. It also contains the role the user has within the site.
- Groups – simply contains the basics with relational data store groups_users.
- Channels – stores the basics of name, description and the group its associated with.
- Groups_users – creates the relationship link between groups and users, once you know what group a user is apart of then the channels can be easily identified.
- Chatlogs – contains information about the group and channel a one to many relationship within containing the individual chat logs.

## REST API

For the project to run correctly it uses several REST API features allowing for the client and server to communicate through the use of JSON and http methods. Below is a breakdown of each route used and brief description on how it works.

| Rotue      | Parameters | Returned Values     | Description     |
| :----:       | :----:       | :----:          |:----:            |
| api/auth-login (GET) | Username and password as class object | JSON {"userLogin":true} | Compares credentials to DB |
| api/auth-logout (GET) | None  | JSON {"loggedOut":true} | Removes logged in user from DB |
| api/auth-read (GET) | None | JSON user details from collection | Gets logged in users details and responds  |
| api/users-create (POST) | New users details as class object 	 | JSON {"userExists":false, "userCreated":true} | Creates new user depending on username being original. |
| api/users-read (GET) | None 	 | JSON User database collection | Returns every user in database |
| api/users-delete (POST) | User id in format “_id” 	 | JSON User database collection | Deletes selected user and returns user collection |
| api/users-update (POST) | User id in format “_id” and new role title 	 | JSON User database collection | Updates user role and returns user collection |
| api/users-one (POST) | User id in format “_id” 	 | JSON 1 User database collection | Returns users details based on id |
| api/channels-create (POST) | New channel details base on class object | JSON {"channelExists":false, "channelCreated":true} | Creates new channel based of supplied information. |
| api/channels-read (GET) | None 	 | JSON Channel database collection | turns all channels in database |
| api/channels-delete (POST) | Channel id in format “_id” 	 | JSON Channel database collection | Deletes channel based off supplied id |
| api/channels-current (GET) | None | JSON Channel database collection | Returns the channels of current user |
| api/channels-channel (GET) | Channel id in format “_id”	 | JSON Channel database collection | Returns one channel based id |
| api/groups-read (GET) | None	 | JSON Group database collection | Returns all groups in database |
| api/groups-create (post) | New group details based on class objects	 | JSON {"groupsExists":false, "groupCreated":true} | Creates new group depending on group name being original |
| api/groups-one (POST) | Group id in the “_id”	 | JSON 1 Group database collection | Returns group based on id |
| api/groups-assigned (POST) | Group id and user id	 | JSON {"previousExists":true, "insertedData":false} | Joins a user to a group and associated channels |
| api/groups-delete (POST) | Group id in the “_id”	 | JSON Group database collection | Deletes group based off supplied id |
| api/groups-current (GET) | None	 | JSON Group database collection | Gets all groups that user is associated with |
| api/groups-users (POST) | Group id in the “_id”	 | JSON Groups_users collection | Checks if user is associated with a group |
| api/chat-read (POST) | Group_id and channel_id 	 | JSON chatlogs collection | Gets the history for chat room |
| api/chat-create (POST) | New chat history based on object class	 | Store chats in history |
| api/image-chat (POST) | Selected image 	 | JSON res.send({result: "OK"}) | Move uploaded image into folder |
| api/image-user (POST) | Selected image 	 | JSON res.send({result: "OK"}) | Move uploaded image into folder |
| this.socket.emit('message', message) (EMIT) | Chat message | Distributed message | Creates the chat interface and sends back message to others in correct rooms |


## Angular Architecture



## Credits

Images and icons sauced from https://www.iconfinder.com/ under free for commercial use.
Layouts generated from ideas from https://www.bootdey.com/snippets/view/Css-Player-User-Cards 

Paul Smyth - S5012116
