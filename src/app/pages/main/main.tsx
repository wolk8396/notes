import React, {ChangeEvent, useEffect, useState } from 'react';
import './main.scss';
import CreateCart from '../../components/create-cart/create-cart';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styleModal } from '../../shared/const-modal-style';
import { ButtonsText, ModalText, Result, SearchInput, TextButtonCart, TextModalError } from '../../shared/const-text';
import { useAppDispatch} from '../../redux/store';
import { DateNote } from '../../modules/notes.module';
import { CreateNotes } from '../../redux/actions/NotesAction';
import { createNotes } from '../../redux/slices/createNoteSlice';
import uuid from 'react-uuid';
import Cart from '../../components/cart/cart';
import { getNotes, setNotes, onClearAllNotes} from '../../services/local-storage-service';

const MainPage = () => {
  const getDate = getNotes()
  const [open, setOpen] = useState<boolean>(false);
  const [render, setRender] = useState<DateNote[]>(getDate);
  const [update, setUpdate] =  useState<DateNote>();
  const dispatch = useAppDispatch();
  let dateNote:DateNote =  {
    id: uuid(),
    tag:[],
    description: ''
  }
  const [date, setDate] = useState<DateNote>(dateNote);
  const [filtered, setFiltered] = useState<DateNote[]>(render);
  const [value, setValue] = useState<boolean>(true);

  const handleOpen = (dateNote:DateNote) =>  {
    setDate(dateNote);
    setOpen(true);
   };

   const handleClose = () => {
    setOpen(false);
    setDate({  id:'',tag:[], description: ''})
   };

   useEffect(() => {
    setFiltered(render);
    if (!!render.length) setNotes(render);
   }, [render])

  const getDateNotes = (notes: DateNote) => {
    const findId = render.find(item => item.id === notes.id);
    if (!!notes.tag.length &&  typeof findId === 'undefined') {
      notes.id = uuid();
      dispatch(CreateNotes(notes)).then(res => {
        let notes = (res.payload as createNotes).notes as DateNote;
          setRender([notes, ...render]);
        });
        handleClose();
    }

    if (typeof findId !== 'undefined' && !!notes.tag.length) {
      const changeTag: DateNote[] = [...render].map(item => {
        return {
          ...item,
          description:item.id === notes.id ? notes.description : item.description,
          tag: item.id === notes?.id ? notes.tag : item.tag
        }
      });
      setNotes(changeTag)
      setUpdate(notes)
      handleClose();
    }
  }

  const onDeleteCart = (cart:DateNote) => {
    const deleteCart = render.filter(item => item.id !== cart.id)
    setRender(deleteCart)
  }

  const upDateCart = (cart:DateNote) => {
    handleOpen(cart);
  }

  const onSearchTag = (e:ChangeEvent<HTMLInputElement>) => {
    const searchTeg = [...render].map(item => {
                    return {
                      ...item,
                      description:item.id === update?.id ? update?.description : item.description,
                      tag: item.id === update?.id ? update.tag : item.tag
                    }
                  }).filter((note, i)=>{
                    return note.tag.join('').includes(e.target.value)
                  });

    if (!!searchTeg.length) setFiltered(searchTeg);
    if (e.target.value.length === 0) setRender(render);
    !!searchTeg.length ? setValue(true) : setValue(false);
  }

  const onClearNotes = () => {
    onClearAllNotes();
    setRender([]);
  }

  return(
    <div className='wrapper'>
      <div  className='wrapper__buttons'>
        <Button variant="contained" onClick={() => handleOpen(dateNote)}>{ButtonsText.btn_create}</Button>
        <Button variant="contained" onClick={onClearNotes}>{ButtonsText.btn_remove}</Button>
      </div>
      <TextField
        onChange={onSearchTag}
        sx={{margin:'1rem 0'}}
        helperText={SearchInput.helperText}
        id="demo-helper-text-misaligned"
        label={SearchInput.label}
      />
      <CreateCart 
        handleModal={handleClose}
        open={open}
        styles={styleModal}
        errorMassages={TextModalError} 
        getDateNote={getDateNotes}
        date={date} 
        text={ModalText}     
      /> 
      <div className='wrapper__carts'>
       {value && filtered.map((note) => (
          (
            <Cart
              key={note.id}
              notes={note}
              update={update}
              text={TextButtonCart}
              onDeleteCart={onDeleteCart} 
              upDateCart={upDateCart}          
            />
          )
        ))}
        {
        !value && <p className='result'>{Result}</p>
        }
			</div>
    </div>
  )
}
export default React.memo(MainPage);
