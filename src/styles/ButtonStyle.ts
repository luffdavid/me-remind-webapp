import styled from "@emotion/styled";
import { Button } from "@mui/material"; // Beachte, dass du die Button-Komponente von MUI importieren musst
import { PRIMARY } from "../services/constants/Constants";

const ButtonStyleContained = ({
  color: 'black',
  backgroundColor: '#08edb3',
  '&:hover': {
    backgroundColor: '#0ab288',
  }
});

const ButtonStyleOutlined = styled(Button)(({ theme }) => ({
  borderColor: '#08edb3',
  color: '#08edb3',
  '&:hover': {
    backgroundColor: '#131A26',
    color: '#08edb3',
    borderColor: '#08edb3',
  },
}));

export { ButtonStyleContained, ButtonStyleOutlined };
