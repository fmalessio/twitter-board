import { Board } from './board';

export class User {

    public static STORAGE_NAME = "twitter-board-user";

    _gid: number;
    id: string;
    fullName: string;
    imageUri: string;
    token: string;
    boards: Board[];

    constructor(profile: any, token: string) {
        this._gid = profile.getId();
        this.id = profile.getEmail();
        this.fullName = profile.getName();
        this.imageUri = profile.getImageUrl();
        this.token = token;
    }
}