import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1200 });
  return isDesktop ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isDesktop = () => useMediaQuery({ minWidth: 1200 });

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 1199 });
  return isMobile ? children : null;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isMobile = () => useMediaQuery({ minWidth: 0, maxWidth: 1199 });
