import styled from "styled-components";
import { IoIosArrowBack } from 'react-icons/io'
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Paper as MuiPaper,
  InputBase as MuiInputBase,
  IconButton as MUiIconButton,
  Divider as MuiDivider,
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Typography as MuiTypography,
  Avatar as MuiAvatar,
  Button as MuiButton,
  //Dialog as MuiDialog,
} from '@mui/material';
import Alert from '@mui/material/Alert';

export const Paper = styled(MuiPaper)`
`;

export const InputBase = styled(MuiInputBase)`
`;


export const IconButton = styled(MUiIconButton)`
`;


export const IoIosArrowBackIcon = styled(IoIosArrowBack)`
  cursor: pointer;
`;

export const SearchHeadWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const Divider = styled(MuiDivider)`
margin: 24px 0 !important;
background-color: rgb(94, 104, 135);
`;


export const TableContainer = styled(MuiTableContainer)`
max-height: 50vh;
overflow-x: hidden !important;

/* width */
::-webkit-scrollbar {
  width: 4px;
  background: #1a1a1a;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #1a1a1a;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(94, 104, 135); 
  border-radius: 10px;
}
`;

export const Table = styled(MuiTable)`
background-color: #1a1a1a;
`;

export const TableBody = styled(MuiTableBody)`
`;

export const TableRow = styled(MuiTableRow)`
`;

export const TableCell = styled(MuiTableCell)`
`;


export const Typography = styled(MuiTypography)`
`;

export const Input = styled.input`
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
&[type=number] {
  -moz-appearance: textfield;
}
`;

export const AlertStyled = styled(Alert)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin: 1rem 1rem 3rem 1rem;
  width: fit-content;
`;

export const Avatar = styled(MuiAvatar)`
`;

export const InputGroup = styled.div`
&&& {
  display: flex;
  align-items: baseline;
}
`;


export const BalanceMaxGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;


export const Button = styled(MuiButton)`

`;

export const TypographyGray = styled(MuiTypography)`
${({ theme: {palette: {custom}} }) => `
  color: ${custom.grayMidDark} !important;
`}
`;

export const InputRow = styled.div`
`;

// export const Dialog = styled(MuiDialog)`

// `;

export const SendToIconWrapper = styled.div`
display: flex;
justify-content: center;
`;

export const ExpandMoreIcon = styled(ExpandMore)`
${({ $isOpen }) => `
rotate: ${$isOpen ? "180deg": "unset"};
cursor: pointer;
`}
`;


export const SendToInputWrapper = styled.div`
&.inactive {
  display: none;
}
&.active {
 display: block;
}
`;
