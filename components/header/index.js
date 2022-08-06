import Image from 'next/image'
import {
  useEffect,
  useState,
  Fragment,
} from 'react'
import { FiArrowUpRight, FiCopy } from 'react-icons/fi'
import { AiOutlineDown } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { HiOutlineDotsVertical, HiExternalLink } from 'react-icons/hi'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ethLogo from '../../assets/eth.png'
import uniswapLogo from '../../assets/uniswap.png'
import { useContext } from 'react'
import { TransactionContext } from '../../context/TransactionContext'
import { client } from '../../lib/sanityClient'
import Link from 'next/link'

import Modal from 'react-modal'
import {
  ContainerModal,
  HeaderModal,
  DetailsGroupModal,
  DisconnectGroup,
  ConnectWith,
  DisconnectButton,
  Address,
  HelperGroup,
  Helper,
  HelperItem,
  VscChromeClose,
  ClipboardGroup,
} from "./style";

Modal.setAppElement('#__next')

const style = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
}

const customStyles = {
  content: {
    top: '58%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

const ModalAccount = ({
  isOpen,
  setOpen,
  userName,
  currentAccount,
  disconnect,
}) => {
  const [copied, setCopied] = useState(false)

  const onCopied = () => {
    setCopied(true)
    setTimeout(function () {
      setCopied(false)
    }, 1000);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen()} style={customStyles}>
      <ContainerModal>
        <HeaderModal>
          Account <VscChromeClose onClick={() => setOpen()} />
        </HeaderModal>
        <DetailsGroupModal>
          <DisconnectGroup>
            <ConnectWith>
              Connected with MetaMask
            </ConnectWith>
            <DisconnectButton
              onClick={() => disconnect()}
            >
              Disconnect
            </DisconnectButton>
          </DisconnectGroup>
          <Address>
            {userName}
          </Address>
          <HelperGroup>
            <HelperItem>
              <Helper>
                <CopyToClipboard
                  text={currentAccount}
                  onCopy={onCopied}
                >
                  <ClipboardGroup>
                    {copied ? <BsCheck2Circle /> : <FiCopy />}&nbsp;&nbsp;

                    <p>{copied ? "Copied" : "Copy Address"}</p>
                  </ClipboardGroup>
                </CopyToClipboard>
              </Helper>
            </HelperItem>
            <HelperItem>
              <Helper>
                <HiExternalLink />&nbsp;&nbsp;View on Explorer
              </Helper>
            </HelperItem>
          </HelperGroup>
        </DetailsGroupModal>
      </ContainerModal>
    </Modal>
  )
}

const Header = () => {
  const [selectedNav, setSelectedNav] = useState('swap')
  const [userName, setUserName] = useState()
  const { connectWallet, currentAccount, logOut, clearCurrentAccount } = useContext(TransactionContext)
  const [open, setOpen] = useState(false)

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

  const disconnect = () => {
    logOut();
    clearCurrentAccount();
    setOpen(false);
  }

  return (
    <Fragment>
      <ModalAccount isOpen={open} userName={userName} currentAccount={currentAccount} setOpen={() => setOpen(false)} disconnect={() => disconnect()} />
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
          <div className={`${style.button} ${style.buttonPadding}`}>
            <div className={style.buttonIconContainer}>
              <Image src={ethLogo} alt='eth logo' height={20} width={20} />
            </div>
            <p>Ethereum</p>
            <div className={style.buttonIconContainer}>
              <AiOutlineDown />
            </div>
          </div>
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
              onClick={() => connectWallet()}
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