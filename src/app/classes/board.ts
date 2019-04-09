import { Interest } from './interest';

export class Board {

    id?: number;
    name: string;
    userId: string;
    interests: Interest[];

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId;
    }

}