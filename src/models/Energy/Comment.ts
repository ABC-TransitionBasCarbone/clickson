export class Comment {
    id: string;
    text: string;
    category: string;
    created_by: string;
    created_at: Date;

    constructor(id: string, text: string, category: string, created_by: string, created_at: Date) {
        this.id = id;
        this.text = text;
        this.category = category;
        this.created_by = created_by;
        this.created_at = created_at;
    }
}