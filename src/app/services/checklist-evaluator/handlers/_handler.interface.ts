import { Observable } from 'rxjs';

export type CompletionStatus = 'loading' | 'complete' | 'incomplete';

export interface ChecklistNoteBase {
    type: 'text' | 'button';
}

export interface ChecklistNoteText extends ChecklistNoteBase {
    type: 'text';
    text: string;
}

export interface ChecklistNoteButton extends ChecklistNoteBase {
    type: 'button';
    label: string;
    onClick: () => Observable<undefined>;
}

export type ChecklistNote = ChecklistNoteText | ChecklistNoteButton;
