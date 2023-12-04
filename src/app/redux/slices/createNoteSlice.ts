import { Reducer } from "react";
import { Action} from "redux";
import { DateNote } from "../../modules/notes.module";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateNotes } from "../actions/NotesAction";


const KEY_CREATE_NOTE =' createNote';

type DynamicKeyUpDateUserData = Reducer<createNotes, Action> | DateNote | undefined;

export interface createNotes {
  notes?: DateNote,
	[key: string]: DynamicKeyUpDateUserData
};

const initialState: createNotes = {
	notes:undefined,
};

const CrateNotesSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(CreateNotes.fulfilled, (state: createNotes, action: PayloadAction<createNotes>) => {
      state.notes = action.payload.notes;
		});
	},
	initialState,
	name: KEY_CREATE_NOTE,
	reducers: {},
});

const NotesSliceReducer = CrateNotesSlice.reducer;

export {NotesSliceReducer, KEY_CREATE_NOTE}


