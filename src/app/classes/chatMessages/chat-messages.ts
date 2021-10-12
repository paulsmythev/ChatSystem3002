//Used for adding new messages
export class ChatMessage {
    constructor(
        public user_id:number,
        public username:string,
        public timestamp:string,
        public message:string,
        public profilepicture:string,
        public imageStatus:boolean,
        public imageName:string
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
        public profilepicture:string,
        public imageStatus:boolean,
        public imageName:string
    ){}
}

