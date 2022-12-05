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
import {
  HiOutlineDotsVertical,
} from 'react-icons/hi'
// import ethLogo from '../../assets/eth.png'
import uniswapLogo from '../../assets/uniswap.png'
import { useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import { client } from '../../lib/sanityClient'
import Link from 'next/link'
import ModalAccount from "../modal/account-details"
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
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
}

const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap');
  const [userName, setUserName] = useState();
  //const [currentNetworkItem, setCurrentNetworkItem] = useState({});
  const {
    connectWalletWeb3,
    currentAccount,
    //logOutMoralis, 
    clearCurrentAccount,
    //updateCurrentNetwork,
    currentNetwork,
    changeNetwork,
  } = useContext(TransactionContext)
  const [open, setOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null);
  const openNetwork = Boolean(anchorEl);

  const handleClickNetwork = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (network) => {
    console.log("network=>", network);
    setAnchorEl(null);
    if (network) {
      updateNetwork(network);
    }
  };

  const updateNetwork = () => {
    //setCurrentNetworkItem(network);
    //updateCurrentNetwork(network);
  };

  const getNetworkMenu = () => {
    return NETWORKS_AVAILABLE.find((network) => network.chainId === currentNetwork.chainId);
  };


  useEffect(() => {
    console.log("window=>", window.location.pathname);
    //if (typeof window == "undefined") return;
    if (currentAccount) {
      (async () => {
        const query = `
        *[_type=="users" && _id == "${currentAccount}"] {
          userName,
        }
        `
        const clientRes = await client.fetch(query)

        if (!(clientRes[0].userName == 'Unnamed')) {
          setUserName(clientRes[0].userName)
        } else {
          setUserName(
            `${currentAccount.slice(0, 7)}...${currentAccount.slice(35)}`,
          )
        }
      })()
    }
  }, [currentAccount])

  // eslint-disable-next-line no-unused-vars
  // const disconnectMoralis = () => {
  //   logOutMoralis();
  //   clearCurrentAccount();
  //   setOpen(false);
  // }

  const disconnectWeb3 = () => {
    clearCurrentAccount();
    setOpen(false);
  }

  return (
    <Fragment>
      <ModalAccount isOpen={open} userName={userName} currentAccount={currentAccount} setOpen={() => setOpen(false)} disconnect={() => disconnectWeb3()} />
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
              onClick={() => setSelectedNav('pool')}
              className={`${style.navItem} ${selectedNav === 'pool' && style.activeNavItem
                }`}
            >
              Pool
            </div>
            <div
              onClick={() => setSelectedNav('vote')}
              className={`${style.navItem} ${selectedNav === 'vote' && style.activeNavItem
                }`}
            >
              Vote
            </div>
            <div
              onClick={() => {
                setSelectedNav('tokens')
              }}
              className={`${style.navItem} ${selectedNav === 'tokens' && style.activeNavItem
                }`}
            >
              <Link
                href={{
                  pathname: "/tokens",
                  query: {},
                }}
              >
                Tokens
              </Link>
            </div>
            <a
              href='https://info.uniswap.org/#/'
              target='_blank'
              rel='noreferrer'
            >
              <div className={style.navItem}>
                Charts <FiArrowUpRight />
              </div>
            </a>
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <div className={`${style.button} ${style.buttonPadding}`} onClick={handleClickNetwork}>
            <div className={style.buttonIconContainer}>
              {/* <Image src={ethLogo} alt='eth logo' height={20} width={20} /> */}
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
                  setOpen(true);
                }}
              >{userName}
              </div>
            </div>
          ) : (
            <div
              onClick={() => connectWalletWeb3()}
              className={`${style.button} ${style.buttonPadding}`}
            >
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                Connect Wallet
              </div>
            </div>
          )}
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonIconContainer} mx-2`}>
              <HiOutlineDotsVertical />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header