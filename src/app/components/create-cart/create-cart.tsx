import React, { ChangeEvent, useEffect, useState } from 'react';
import './create-cart.scss';
import uuid from 'react-uuid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateNote } from '../../modules/notes.module';
import { ErrorModalErrorModule } from '../../modules/text.module';

interface CreateCartProps {
  handleModal: () => void,
  open:boolean,
  styles:any,
  errorMassages:ErrorModalErrorModule,
  getDateNote: (notes: DateNote) => void;
  date:DateNote
}

const CreateCart = (props:CreateCartProps) => {
  const {handleModal, open, styles, errorMassages, getDateNote, date} = props;
  const cloneDate = {...date};
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [update, setUpdate] = useState<DateNote>(date);
 
  useEffect(() => {
    if (!open) {
      setError(''); 
      setValue('')
    } else setValue(cloneDate.description)
  },[open])

  const onCreateNote = () => {
    const checkFieldTag = !!update.tag.length;
    !checkFieldTag ? setError(errorMassages?.error): setError('');
    if (!!!update.description.length) setError(errorMassages?.required);
    getDateNote(update);  
  }

  const onHandlerNote = (e:ChangeEvent<HTMLInputElement>) => {
    const tagRegex = /#(\w+)/g;
    const matches = e.target.value.match(tagRegex);
    cloneDate.description = e.target.value;
    cloneDate.tag = matches ? matches.map((match) => match.slice(1)) : [];
    setUpdate(cloneDate)
    setValue(e.target.value);
  }

  return(
    <Modal
    open={open}
    onClose={handleModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={styles} >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        your note the #tag
      </Typography>
      <TextField
          onChange={onHandlerNote}
          id="outlined-multiline-static"
          label="Multiline"
          multiline={true}
          sx={{width:'100%', marginTop:'1rem'}}
          rows={10}
          error={!!error.length}
          value={value}
        />
        <Button  sx={{marginTop:'1rem'}} onClick={onCreateNote} variant="outlined">Submit</Button>
        <Typography sx={{marginTop:'1rem', color:'red'}} id="modal-modal-title" variant="h6" component="h2">
          {error}
      </Typography>
    </Box>
  </Modal>
  )
}

export default CreateCart;