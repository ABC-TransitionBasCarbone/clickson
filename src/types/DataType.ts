
type QuestionType = "table";
export interface DataType {
    key: string;
    category: string;
    type: QuestionType;
    titleSelectInput: string;
    titleAnnualConsumptionInput: string;
    tableHeader: string[];
    description: string;
}
