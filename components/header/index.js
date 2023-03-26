import Image from 'next/image'
import React, {
  useEffect,
  useState,
  Fragment,
} from 'react'
import {
  FiArrowUpRight,
} from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import uniswapLogo from '../../assets/uniswap.png'
import { useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import Link from 'next/link'
import ModalAccount from "../modal/account-details"
import ModalWallet from "../modal/connect-wallet"
import { NETWORKS_AVAILABLE } from '../../utils/constants';
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  openWalletModal,
  closeWalletModal,
  openAccountModal,
  closeAccountModal,
  getWalletModal,
  getAccountModal
} from "../../redux/slices/ui";
import {
  getAccount,
  getNetwork,
} from "../../redux/slices/authenticate";
import { Desktop, Mobile } from '../layout/responsive';

import {
  Menu,
  MenuItem,
  MenuItemButton,
  NetworkLogo,
  NetworkName,
} from "./style"

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center overflow-auto`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer gap-1`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA] text-center`,
}

const Header = () => {
  const dispatchStore = useAppDispatch();
  const openWallet = useAppSelector(getWalletModal);
  const openAccount = useAppSelector(getAccountModal);
  const currentAccount = useAppSelector(getAccount);
  const currentNetwork = useAppSelector(getNetwork)

  const [selectedNav, setSelectedNav] = useState('swap');
  const [userName, setUserName] = useState();
  const {
    disconnect,
    changeNetwork,
  } = useContext(TransactionContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const openNetwork = Boolean(anchorEl);

  const handleClickNetwork = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNetworkMenu = () => {
    return NETWORKS_AVAILABLE.find((network) => network.chainId === currentNetwork.chainId);
  };


  useEffect(() => {
    if (currentAccount) {
      setUserName(
        `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`,
      )
    }
  }, [currentAccount])

  const disconnectWeb3 = () => {
    disconnect();
    dispatchStore(closeAccountModal())
  }

  return (
    <Fragment>
      <ModalAccount 
      isOpen={openAccount} 
      userName={currentAccount} 
      currentAccount={currentAccount} 
      currentNetwork={currentNetwork} 
      closeModal={() => dispatchStore(closeAccountModal())} 
      disconnect={() => disconnectWeb3()} 
      />
      <ModalWallet 
      isOpen={openWallet} 
      userName={currentAccount} 
      currentAccount={currentAccount} 
      currentNetwork={currentNetwork} 
      closeModal={() => dispatchStore(closeWalletModal())} 
      disconnect={() => disconnectWeb3()} 
      />
      <div className={style.wrapper}>
        <div className={style.headerLogo}>
          <Image src={uniswapLogo} alt='3ether.io' height={40} width={40} />
        </div>
        {
          <Desktop>
                    <div className={style.nav}>
          <div className={style.navItemsContainer}>
            <div
              onClick={() => setSelectedNav('swap')}
              className={`${style.navItem} ${selectedNav === 'swap' && style.activeNavItem
                }`}
            >
              <Link
                href="/"
              >
                Swap
              </Link>
            </div>
            <a
              href={getNetworkMenu()?.changeNetworkParam?.blockExplorerUrls}
              target='_blank'
              rel='noreferrer'
            >
              <div className={style.navItem}>
                Explorer <FiArrowUpRight />
              </div>
            </a>
          </div>
        </div>
        </Desktop>
        }
        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.buttonPadding}`} onClick={handleClickNetwork}>
            <div className={style.buttonIconContainer}>
              <NetworkLogo src={getNetworkMenu() ? getNetworkMenu().logoURI : ''} />
            </div>
            <p>{getNetworkMenu() ? getNetworkMenu().network : ''}</p>
            <div className={style.buttonIconContainer}>
              <AiOutlineDown />
            </div>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openNetwork}
            onClose={() => handleClose()}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {NETWORKS_AVAILABLE.map((network) => <MenuItem key={network.chainId} onClick={() => handleClose(network)}>
              <MenuItemButton onClick={() => changeNetwork(network)}>
                <NetworkLogo src={network.logoURI} />
                <NetworkName variant='subtitle2'>{network.network}</NetworkName>
              </MenuItemButton>
            </MenuItem>)}
          </Menu>
          {currentAccount ? (
            <div className={`${style.button} ${style.buttonPadding}`}>
              <div
                className={style.buttonTextContainer}
                onClick={() => {
                  dispatchStore(openAccountModal())
                }}
              >{userName}
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                dispatchStore(openWalletModal());
              }}
              className={`${style.button} ${style.buttonPadding}`}
            >
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                Connect
              </div>
            </div>
          )}
          {/* <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonIconContainer} mx-2 cursor-not-allowed`}>
              <HiOutlineDotsVertical />
            </div>
          </div> */}
        </div>

      </div>
      {
          <Mobile>
        <div className={style.nav}>
          <div className={style.navItemsContainer}>
            <div
              onClick={() => setSelectedNav('swap')}
              className={`${style.navItem} ${selectedNav === 'swap' && style.activeNavItem
                }`}
            >
              <Link
                href="/"
              >
                Swap
              </Link>
            </div>
            <a
              href={getNetworkMenu()?.changeNetworkParam?.blockExplorerUrls}
              target='_blank'
              rel='noreferrer'
            >
              <div className={style.navItem}>
                Explorer <FiArrowUpRight />
              </div>
            </a>
          </div>
        </div>
        </Mobile>
        }
    </Fragment>
  )
}

export default Header