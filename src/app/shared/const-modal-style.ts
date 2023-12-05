import { StyleModalModule } from "../modules/style.modules";

const styleModal:StyleModalModule = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '78%',
  maxWidth:'600px',
  minWidth:'240px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: 400,
  height:'90%'
};

export {styleModal};
