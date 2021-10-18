//Used displaying channels in database
export class Channels {
    constructor(
        public _id:number,
        public group_id:number,
        public name:string,
        public createdBy_id:string,
        public description:string,
        public groupPicture_id:string,
    ) {}
}
//Used for adding new channels
export class Channel {
    constructor(
        public group_id:number,
        public name:string,
        public createdBy_id:string,
        public description:string,
        public groupPicture_id:string,
    ) {}
}