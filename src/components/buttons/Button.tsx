import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#08edb3'),
  backgroundColor: '#08edb3',
  '&:hover': {
    backgroundColor: '#0ab288',
  },
}));

const SecondaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderColor: '#08edb3',
  color: '#08edb3',
  '&:hover': {
    backgroundColor: '#131A26',
    color: '#08edb3',
    borderColor: '#08edb3',
  },
}));

interface CustomizedButtonProps {
  text: string;
  variant: 'contained' | 'outlined';
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export default function CustomizedButton({ text, variant, onClick, type }: CustomizedButtonProps) {
  if (variant === 'contained') {
    return (
      <Stack spacing={2} direction="row">
        <ColorButton variant="contained" onClick={onClick} type={type}>
          {text}
        </ColorButton>
      </Stack>
    );
  } else if (variant === 'outlined') {
    return (
      <Stack spacing={2} direction="row">
        <SecondaryButton  variant="outlined" onClick={onClick} type={type}>
          {text}
        </SecondaryButton>
      </Stack>
    );
  }
  return null;
}
