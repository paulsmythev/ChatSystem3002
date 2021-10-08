//Used for adding new messages
export class ChatMessage {
    constructor(
        public user_id:number,
        public username:string,
        public timestamp:string,
        public message:string,
        public profilepicture:string
    ){}
}
//Used displaying messages in database
export class ChatMessages {
    constructor(
        public log_id:number,
        public user_id:number,
        public username:string,
        public timestamp:string,
        public message:string,
        public profilepicture:string
    ){}
}

