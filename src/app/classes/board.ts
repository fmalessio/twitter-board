export class Board {

    id?: number;
    name: string;
    userId: string;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
    }

}