type QuestionType = "table";
export interface DataToFill {
    key: string;
    category: string;
    type: QuestionType;
    options: Option[];
    titleSelectInput: string;
    titleAnnualConsumptionInput: string;
    tableHeader: string[];
    description: string;
    units?: Map<string, string>;
}
