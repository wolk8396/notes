import { DateNote } from "../modules/notes.module";

const setNotes = (notes: DateNote[]): void => localStorage.setItem('note', JSON.stringify(notes));
const getNotes = (): DateNote[] | [] => JSON.parse(localStorage.getItem('note') || '[]');
const onClearAllNotes = (): void => localStorage.clear();

export {setNotes, getNotes, onClearAllNotes};