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
}

const CreateCart = (props:CreateCartProps) => {
  const {handleModal, open, styles, errorMassages, getDateNote} = props;
  const [error, setError] = useState<string>('');

  const date:DateNote =  {
    id: '',
    tag:[],
    description: ''
  }

  useEffect(() => {
    if (!open) setError('');
  
  },[open])

  const onCreateNote = () => {
    const checkFieldTag = !!date.tag.length;
    const uniqueId = uuid();
    date.id = uniqueId;
    !checkFieldTag ? setError(errorMassages?.error): setError('');
    if (!!!date.description.length) setError(errorMassages?.required);
    
    if (!!date.tag.length) {
      getDateNote(date);
    } 
  
  }

  const onHandlerNote = (e:ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    // date.description =  e.target.value.replace(/#/g, '');
    date.description = e.target.value;
    const tagRegex = /#(\w+)/g;
    const matches = text.match(tagRegex);
    date.tag = matches ? matches.map((match) => match.slice(1)) : [];
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
        Text in a modal
      </Typography>
      <TextField
          onChange={onHandlerNote}
          id="outlined-multiline-static"
          label="Multiline"
          multiline={true}
          sx={{width:'100%', marginTop:'1rem'}}
          rows={10}
          defaultValue=""
          error={!!error.length}
        />
        <Button  sx={{marginTop:'1rem'}} onClick={onCreateNote} variant="outlined">Outlined</Button>

        <Typography sx={{marginTop:'1rem', color:'red'}} id="modal-modal-title" variant="h6" component="h2">
          {error}
      </Typography>
    </Box>
  </Modal>
  )
}

export default CreateCart;