import styled from "styled-components";
import { VscChromeClose as VscChromeCloseIcon } from 'react-icons/vsc'
import {
  Paper as MuiPaper,
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Avatar as MuiAvatar,
} from '@mui/material';

export const ContainerModal = styled.div`
  margin: 0px 0px 2rem;
  background-color: rgb(25, 27, 31);
  border: 1px solid rgb(33, 36, 41);
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 8px 0px;
  padding: 0px;
  width: 50vw;
  overflow: hidden auto;
  align-self: center;
  min-width: 420px;
  min-height: 20vh;
  display: flex;
  border-radius: 20px;
  padding: 1rem;
  flex-direction: column;
`;

export const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-flow: row nowrap;
  font-weight: 500;
  color: rgb(255, 255, 255);
  padding-bottom: 1rem;
`;


export const DetailsGroupModal = styled.div`
  padding: 1rem;
  border: 1px solid rgb(64, 68, 79);
  border-radius: 20px;
  position: relative;
  display: grid;
  row-gap: 12px;
  margin-bottom: 20px;
`;

export const DisconnectGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ConnectWith = styled.a`
  font-size: 0.825rem;
  font-weight: 500;
  color: rgb(143, 150, 172);
  font-family: 'Inter custom',sans-serif;
`;


export const DisconnectButton = styled.button`
  font-size: 0.825rem;
  font-weight: 400;
  margin-right: 8px;
  padding: 4px 6px;
  border: 1px solid rgba(55, 107, 173, 0.44);
  color: rgb(33, 114, 229);
  border-radius: 12px;
`;

export const Address = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 1.25rem;
  color: rgb(255, 255, 255);
`;

export const HelperGroup = styled.div`
  display: flex;
`;

export const HelperItem = styled.button`
  color: rgb(143, 150, 172);
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  background: none;
  cursor: pointer;
  padding: 0 5px; 
`;

export const Helper = styled(ConnectWith)`
  margin-left: 0.25rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const VscChromeClose = styled(VscChromeCloseIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const ClipboardGroup = styled.div`
  display: flex;
  align-items: center;
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

export const Paper = styled(MuiPaper)`
`;

export const Avatar = styled(MuiAvatar)`
`;
