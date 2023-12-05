import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DateNote } from '../../modules/notes.module';
import { CartButtonTextModule } from '../../modules/text.module';
import './cart.scss';
import { useEffect, useState } from 'react';

interface CartProps {
  notes:DateNote,
  text:CartButtonTextModule,
  onDeleteCart: (cart:DateNote) => void,
  upDateCart:(cart:DateNote) => void,
  update:DateNote | undefined,
}

const Cart = (props:CartProps) => {
  const {notes, text, onDeleteCart, upDateCart, update} = props;
  const [value, setValue] = useState<DateNote>(notes)
  let tags = value.tag.map(teg => `#${teg}`).join(',');

  useEffect(() => {
    if (update?.id === notes.id && typeof update !== 'undefined') {
      setValue(update);
    }

  }, [update])

  return (
    <Card sx={{ maxWidth: 400, width:'90%', height:250}}>
      <CardContent>
        <Typography sx={{width:'90%', maxHeight:150}} gutterBottom variant="h5" component="div">
         {tags}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {value.description.replace(/#/g, '')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onDeleteCart(notes)}>{text.delete}</Button>
        <Button size="small" onClick={() => upDateCart(notes)}>{text.update}</Button>
      </CardActions>
    </Card>
  )
}

export default Cart;