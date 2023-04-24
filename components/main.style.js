import styled from "styled-components";
import { IoIosArrowBack } from 'react-icons/io'
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
  Typography as MuiTypography
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
background-color: white;
`;


export const TableContainer = styled(MuiTableContainer)`
max-height: 50vh;
overflow-x: hidden !important;
`;

export const Table = styled(MuiTable)`
background-color: #191B1F;
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