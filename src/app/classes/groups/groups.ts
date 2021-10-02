//Used displaying groups in database
export class Groups {
    constructor(
        public _id:number,
        public name:string,
        public createdBy_id:string,
        public description:string,
        public groupPicture_id:string,
    ) {}
}
//Used for adding new groups
export class Group {
    constructor(
        public name:string,
        public createdBy_id:string,
        public description:string,
        public groupPicture_id:string,
    ) {}
}