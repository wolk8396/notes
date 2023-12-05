import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DateNote } from '../../modules/notes.module';
import { CartButtonTextModule } from '../../modules/text.module';
import './cart.scss';

interface CartProps {
  notes:DateNote,
  text:CartButtonTextModule,
  onDeleteCart: (cart:DateNote) => void
  upDateCart:(cart:DateNote) => void
}

const Cart = (props:CartProps) => {
  const {notes, text, onDeleteCart, upDateCart} = props;
  const tags = notes.tag.map(teg => `#${teg}`).join(',');

  return (
    <Card sx={{ maxWidth: 400, width:'90%', height:250}}>
      <CardContent>
        <Typography sx={{width:'90%', maxHeight:150}} gutterBottom variant="h5" component="div">
         {tags}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {notes.description.replace(/#/g, '')}
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