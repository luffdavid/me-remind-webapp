import { PRIMARY } from "../services/constants/Constants";

const TfStyleSecondary = {
    backgroundColor:'white',
    '& label.Mui-focused': {
      backgroundColor: PRIMARY,
      padding:'2px'
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
  }
  export default TfStyleSecondary;