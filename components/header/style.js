import styled from "styled-components";
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Typography as MuiTypography,
  Avatar as MuiAvatar,
} from '@mui/material';

export const Menu = styled(MuiMenu)`
.MuiPaper-root {
  background-color: #1a1a1a;
  color: white;
}
`;


export const MenuItem = styled(MuiMenuItem)`
  min-height: 48px !important;
`;

export const MenuItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NetworkLogo = styled.img`
  width: 24px;
  height: 24px;
`;

export const NetworkName = styled(MuiTypography)`
font-weight: 600 !important;
color: white;
`;

export const Avatar = styled(MuiAvatar)``;

export const MenuMobile = styled.div`
max-height: 64px;
`;
