# Chat System 3002 <img src="src/assets/images/5027877_bubble_chat_communication_interaction_online%20chat_icon.png" width="64px" height="64px" />

Paul Smyth S5012116 - 3813ICT Trimester 2 2021 - Assignment Phase 2

## Git Repository 

The majority of the project was developed using local repository’s that were pushed to the remote repository at either a major millstone or a at the end of day. Branch’s where used to represent different versions of the project with each being merge with the master once complete.

| Branch | Description |
| :----: | :----:      | 
| master |  |
| additional_sockets |  |
| image_uploading |  |
| error_handling |  |
| chat_sockets |  |
| permissions |  |
| database_corrections |  |
| channels |  |
| users |  |
| authentication |  |
| app_structure |  |
| fresh_install |  |
| spare |  |
| spare |  |
| spare |  |

## Data Structures

The data structures are represented within the Mongo database collections accessed on the  server side. In total there are 6 listed below detailing their purpose,

- Current_user – stores the current logged in user, accessible to both server and client.
<br>"_id" : number, "email" : string, "username" : string, "password" : string, "role" : string, "profilepicture" : string
- Users – stores all users for the project and prevents adding a new user that has the same username. It also contains the role the user has within the site.
<br>"_id" : number, "email" : string, "username" : string, "password" : string, "role" : string, "profilepicture" : string
- Groups – simply contains the basics with relational data store groups_users.
<br>"_id" : number, "name" : string, "createdBy_id" : string, "description" : string, "groupPicture_id" : string****
- Channels – stores the basics of name, description and the group its associated with.
<br>"_id" : 1, "group_id" : number, "name" : string, "createdBy_id" : string, "description" : string, "groupPicture_id" : string
- Groups_users – creates the relationship link between groups and users, once you know what group a user is apart of then the channels can be easily identified.
<br>"_id" : ObjectId, "group_id" : number, "user_id" : number, "username" : string, "name" : string
- Chatlogs – contains information about the group and channel a one to many relationship within containing the individual chat logs.
<br>"_id" : ObjectId, "group_id" : number, "group_name" : string, "channel_id" : number, "channel_name" : sting, "chatlog" : [{"log_id" : 1, "user_id" : 1, "username" : string, "timestamp" : timestamp, "message" : string, "profilepicture" : string, "imageStatus" : boolean, "imageName" : string}]

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

Components make up the majority of the Angular architecture and are sorted into several groups that represented the main site functions like users, authentication, groups, chat and channels. The actual components have been named after CRUD functions where possible with the naming conventions kept similar throughout the project.
The services are stored together in the app directory and provide the interface between the client and the server. The largest was the database service that stores the API calls that are passed and receive information from the get and post methods with the server. The image service makes possible for the uploading of user chat images and providing a profile picture for new users. The last service handles the message transfer of the socket.io chat function that allows the user to chat in multiple instances of a room or in many separate rooms.
Classes featured predominantly thought-out project and are organised into a class folder in the app directory, inside the file there is a class representing many iterations used for displaying data sourced from the database and another used to pass in new instances to the database.

<br>List of routes: 
| Route      | Description |
| :----:     | :----:      | 
| Login | Provides the user a form to enter their login details. |
| logout | Clears users from authorisation and returns them to login screen. |
| users/create | Depending on user role, either a form to create a user or redirected. | 
| users/current | Will show the details of the current login user. |
| users/read | Depending on user role, show all users allowing for role change or deleting. |
| groups/assigned | Depending on user role, attach user to groups. |
| groups/create | Depending on user role, created new groups. |
| groups/current | Shows a list of all groups the user belongs to and drop-down list to enter chat. |
| groups/read | Depending on user role, shows and provide admin functions. |
| channels/create | Depending on user role, allow for new channel attached to group. |
| channels/current | Shows all channels user is attached to. |
| channels/read | Depending on user role, see all channels and allow for deletion. |
| chat/read/:group/:channel | Available to all registered users, takes the parameters of the "group_id" and the "channel_id" which in return loads the correct chat room and its history. |



## Credits

Images and icons sauced from https://www.iconfinder.com/ under free for commercial use.<br>
Layouts generated from ideas from https://www.bootdey.com/snippets/view/Css-Player-User-Cards 

<<<<<<< HEAD
Paul Smyth - S5012116
=======
Paul Smyth - S5012116
>>>>>>> c2780cba1670f8a727a9bc3266085c04d035c256
