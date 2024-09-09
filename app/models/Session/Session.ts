export class Session {
    id: number;
    name: string;
    progress: number;

    constructor(id: number, name: string, progress: number) {
        this.id = id;
        this.name = name;
        this.progress = progress;
    }
}