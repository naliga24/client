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
  const [selectedNav, setSelectedNav] = useState('swap');
  const [userName, setUserName] = useState();
  const {
    currentAccount,
    disconnect,
    currentNetwork,
    changeNetwork,
  } = useContext(TransactionContext)
  const [openAccount, setOpenAccount] = useState(false)
  const [openWallet, setOpenWallet] = useState(false)

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
    setOpenAccount(false);
  }

  return (
    <Fragment>
      <ModalAccount isOpen={openAccount} userName={currentAccount} currentAccount={currentAccount} currentNetwork={currentNetwork} setOpen={() => setOpenAccount(false)} disconnect={() => disconnectWeb3()} />
      <ModalWallet isOpen={openWallet} userName={currentAccount} currentAccount={currentAccount} currentNetwork={currentNetwork} setOpen={() => setOpenWallet(false)} disconnect={() => disconnectWeb3()} />
      <div className={style.wrapper}>
        <div className={style.headerLogo}>
          <Image src={uniswapLogo} alt='uniswap' height={40} width={40} />
        </div>
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
            <div
              //onClick={() => setSelectedNav('pool')}
              className={`${style.navItem} ${selectedNav === 'pool' && style.activeNavItem} cursor-not-allowed`}
            >
              Pool
            </div>
            <div
              //onClick={() => setSelectedNav('vote')}
              className={`${style.navItem} ${selectedNav === 'vote' && style.activeNavItem} cursor-not-allowed`}
            >
              Vote
            </div>
            <div
              onClick={() => {
                //setSelectedNav('tokens')
              }}
              className={`${style.navItem} ${selectedNav === 'tokens' && style.activeNavItem} cursor-not-allowed`}
            >
             Tokens
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
                  setOpenAccount(true);
                }}
              >{userName}
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                //connectWalletWeb3();
                setOpenWallet(true);
              }}
              className={`${style.button} ${style.buttonPadding}`}
            >
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                Connect Wallet
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
    </Fragment>
  )
}

export default Header