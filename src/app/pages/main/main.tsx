import React, {useState } from 'react';
import './main.scss';
import CreateCart from '../../components/create-cart/create-cart';
import Button from '@mui/material/Button';
import { styleModal } from '../../shared/const-modal-style';
import { TextButtonCart, TextModalError } from '../../shared/const-text';
import { useAppDispatch} from '../../redux/store';
import { DateNote } from '../../modules/notes.module';
import { CreateNotes } from '../../redux/actions/NotesAction';
import { createNotes } from '../../redux/slices/createNoteSlice';
import uuid from 'react-uuid';
import Cart from '../../components/cart/cart';

const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [render, setRender] = useState<DateNote[]>([]);
  const dispatch = useAppDispatch();
  let dateNote:DateNote =  {
    id: uuid(),
    tag:[],
    description: ''
  }
  const [date, setDate] = useState<DateNote>(dateNote);

   const handleOpen = (dateNote:DateNote) =>  {
    setDate(dateNote);
    setOpen(true);
   };

   const handleClose = () => {
    setOpen(false);
    setDate({  id:'',tag:[], description: ''})
   };


  const getDateNotes = (notes: DateNote) => {
    const findId = render.find(item => item.id === notes.id);
    if (!!notes.tag.length &&  typeof findId === 'undefined') {
      notes.id = uuid();
      dispatch(CreateNotes(notes)).then(res => {
        let notes = (res.payload as createNotes).notes as DateNote;
          setRender([...render, notes])
        });
        handleClose();
    }

    if (typeof findId !== 'undefined' && !!notes.tag.length) {
      const changeTag: DateNote[] = render.map(item => {
        return {
          ...item,
          description:item.id === notes.id ? notes.description : item.description
        }
      });
      setRender(changeTag);
      handleClose();
    }
  }

  const onDeleteCart = (cart:DateNote) => {
    const deleteCart = render.filter(item => item.id !== cart.id)
    setRender(deleteCart)
  }

  const upDateCart = (cart:DateNote) => {
    handleOpen(cart)
  }

  return(
    <div className='wrapper'>
      <Button variant="contained" onClick={() => handleOpen(dateNote)}>Create Note</Button>
      <CreateCart 
        handleModal={handleClose}
        open={open}
        styles={styleModal}
        errorMassages={TextModalError} 
        getDateNote={getDateNotes}
        date={date}      
      /> 
      <div className='wrapper__carts'>
        {render.map((note) => (
          (
            <Cart
              key={note.id}
              notes={note}
              text={TextButtonCart}
              onDeleteCart={onDeleteCart} 
              upDateCart={upDateCart}          
            />
          )
        ))}
			</div>
    </div>
 
  )
}
export default React.memo(MainPage);
