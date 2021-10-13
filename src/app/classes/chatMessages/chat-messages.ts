//Used for adding new messages
export class ChatMessage {
    constructor(
        public group_id:number,
        public channel_id:number,
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
        public group_id:number,
        public channel_id:number,
        public user_id:number,
        public username:string,
        public timestamp:string,
        public message:string,
        public profilepicture:string,
        public imageStatus:boolean,
        public imageName:string
    ){}
}

