import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { PRIMARY } from '../../services/constants/Constants';


const CssTextField = styled(TextField)({
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
});

interface CustomizedTextFieldProps {
    label: string;
    type?: string;
    value?: any;
    onChange?: (e:any) => void;
    placeholder?:string;
  }
  const CustomizedTextField: React.FC<CustomizedTextFieldProps> = (props) => {
    const { label, type, value, onChange, placeholder } = props;

  return (
    <CssTextField
    id="custom-css-outlined-input"
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
  );
}
export default CustomizedTextField;