import { useMediaQuery } from 'react-responsive';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  return isDesktop ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const TabletToDesktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 421 });
  return isDesktop ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const Tablet = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 421, maxWidth: 1199 });
  return isMobile ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const MobileToTablet = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 0,  maxWidth: 1199 });
  return isDesktop ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 420 });
  return isMobile ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isDesktop = () => useMediaQuery({ minWidth: 1200 });

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isMobile = () => useMediaQuery({ minWidth: 0, maxWidth: 1199 });