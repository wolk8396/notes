import React, { useEffect, useState } from 'react';
import './main.scss';
import CreateCart from '../../components/create-cart/create-cart';
import Button from '@mui/material/Button';
import { styleModal } from '../../shared/const-modal-style';
import { TextModalError } from '../../shared/const-text';
import { useAppDispatch} from '../../redux/store';
import { DateNote } from '../../modules/notes.module';
import { CreateNotes } from '../../redux/actions/NotesAction';
import { createNotes } from '../../redux/slices/createNoteSlice';

const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [render, setRender] = useState<DateNote[]>([]);
  const dispatch = useAppDispatch();

  // console.log('red', render);
  
  const getDateNotes = (notes: DateNote) => {
   dispatch(CreateNotes(notes)).then(res => {
    let notes = (res.payload as createNotes).notes as DateNote;
      setRender([...render, notes])
      handleClose();
    });
  }

  return(
    <>
      <Button variant="contained" onClick={handleOpen}>Contained</Button>
      <CreateCart 
        handleModal={handleClose}
        open={open}
        styles={styleModal}
        errorMassages={TextModalError} 
        getDateNote={getDateNotes}        
      /> 
    </>
 
  )
}
export default React.memo(MainPage);
