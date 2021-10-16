# Chat System 3000 <img src="src/assets/images/5027877_bubble_chat_communication_interaction_online%20chat_icon.png" width="64px" height="64px" />

Paul Smyth S5012116 - 3813ICT Trimester 2 2021 - Assignment Phase 1

## Git Repository 

I’ve used git in a way that breaks down the program into sections relating to the individual parts need for completing the assignment. Once each branch is complete its merged with the master branch, then the next branch is created and checked out and the process starts again. Any small changes were committed as increments to the version being worked on.

## Data Structures

On the initial start-up of the project, a check is preformed to see what local storage contains, if data is missing then the original values stored in JSON files are load into local storage allowing for the site to function.
User data contains the information relating to username and their role which allows for certain page permissions and if insufficient privilege is held then they are redirect to the groups page accessible to all users.
A bridging table/JSON between user and groups was to create to as a way of making a relationship that was problematic not being able to use a database for queries. This also allowed users to be matched up with the channels associated with those groups.

## REST API

In phase 1 of the assignment, I haven’t utilised this feature. I have tried to use it for an issue I been having on writing data to file, at the time I didn’t have the knowledge to pass data between the front end and the server end.

## Angular Architecture

Most of my Angular architecture revolved around the components that make up the page structure for the site. The routes were used to access the each component and in some cases a route was created to handle page permission and was able to send a user depending on whether they are a authenticated, a guest and depending on their role.
The app.componet redirected all requests unless authenticated to the login page but not before loading in the data if necessary. All logout requests remove the authuser from local storage before displaying the login page.

## Credits

Images and icons sauced from https://www.iconfinder.com/ under free for commercial use.
Layouts generated from ideas from https://www.bootdey.com/snippets/view/Css-Player-User-Cards 

Paul Smyth - S5012116
