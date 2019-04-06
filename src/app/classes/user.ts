export class User {

    public static STORAGE_NAME = "twiiter-board-user";

    _id: number;
    name: string;
    email: string;
    imageUri: string;
    token: string;

    constructor(profile: any, token: string) {
        this._id = profile.getId();
        this.name = profile.getName();
        this.email = profile.getImageUrl();
        this.imageUri = profile.getEmail();
        this.token = token;
    }
}