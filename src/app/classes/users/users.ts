//Used for adding new users
export class User {
    constructor(
        public email:string,
        public username:string,
        public password:string,
        public role:string,
        public profilepicture:string
    ) {}
}
//Used displaying users in database
export class Users {
    constructor(
        public _id:number,
        public email:string,
        public username:string,
        public password:string,
        public role:string,
        public profilepicture:string
    ) {}
}