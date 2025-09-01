import { ChecklistItem } from "../checklist/checklist.interface";
import { ChecklistNote, CompletionStatus } from "./handlers/_handler.interface";

export interface EvaluatedChecklistItem {
    shown: boolean;
    completed: CompletionStatus;
    label: string;
    note: ChecklistNote | undefined;
    subitems: string[];
    wowheadId: string;
    baseItem: ChecklistItem;
}
