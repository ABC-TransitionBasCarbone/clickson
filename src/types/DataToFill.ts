import { Energy } from "../models/Energy/Energy";
import { Option } from "../models/Select/Option";

export type DataType = Energy;
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
