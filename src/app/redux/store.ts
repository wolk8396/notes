import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { KEY_CREATE_NOTE, NotesSliceReducer } from "./slices/createNoteSlice";

export const store = configureStore({	
	reducer: {
		[KEY_CREATE_NOTE]: NotesSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => RootDispatch = useDispatch;