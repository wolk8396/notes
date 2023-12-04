import { createAsyncThunk } from "@reduxjs/toolkit"
import { DateNote } from "../../modules/notes.module"

export const CreateNotes = createAsyncThunk(
	'CREATE_USER_NOTE', async (notes: DateNote) =>{
		return {
			notes: notes
		}
	}
)