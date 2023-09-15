import { PRIMARY } from "../services/constants/Constants";

const TextFieldStyle = {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: PRIMARY,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E0E3E7',
      },
      '&:hover fieldset': {
        borderColor: PRIMARY,
      },
      '&.Mui-focused fieldset': {
        borderColor: PRIMARY,
      },
    },
  };
  
  export default TextFieldStyle;