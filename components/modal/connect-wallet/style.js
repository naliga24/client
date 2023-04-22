import styled from "styled-components";
import { VscChromeClose as VscChromeCloseIcon } from 'react-icons/vsc'
import {Stack as MuiStack, Typography as MuiTypography} from '@mui/material'
import Link from 'next/link'

export const ContainerModal = styled.div`
  ${({ theme }) => `
  margin: 0px 0px 5rem;
  background-color: rgb(25, 27, 31);
  border: 1px solid rgb(33, 36, 41);
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 8px 0px;
  width: 26.125rem;
  overflow: hidden auto;
  align-self: center;
  display: flex;
  border-radius: 20px;
  padding: 1rem;
  flex-direction: column;
  @media ${theme.breakpoints.mobile} {
    padding: 3rem;
 }
`}
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

export const VscChromeClose = styled(VscChromeCloseIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

export const Stack = styled(MuiStack)`

`;

export const Item = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
gap: 18px;
cursor: pointer;
}
`;

export const Typography = styled(MuiTypography)`
font-weight: 600;
color: rgb(255, 255, 255);
`;

export const StyledLink = styled(Link)`
`;

export const TypographyLegalDocs = styled(MuiTypography)`
color: rgb(152, 161, 192);
a {
  color: rgb(76, 130, 251);
}
`;
