import { Tweet } from './tweet';

export class Interest {

    public static HASHTAG = "HASHTAG";
    public static USER = "USER";

    id?: number;
    value: string;
    interestType: string;
    boardId: number;
    tweets?: Tweet[];

    constructor(value: string, boardId: number) {
        this.value = value;
        this.interestType = value.startsWith("#") ? Interest.HASHTAG : Interest.USER;
        this.boardId = boardId;
    }

}