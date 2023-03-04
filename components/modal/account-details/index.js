import React,{
    useState, useContext,
  } from 'react'
 import { 
    FiCopy 
} from 'react-icons/fi'
import { BsCheck2Circle } from 'react-icons/bs'
import { 
    HiExternalLink } from 'react-icons/hi'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NETWORKS_AVAILABLE } from '../../../utils/constants';
import Modal from 'react-modal'
import { TransactionContext } from '../../../context/TransactionContext'

Modal.setAppElement('#__next')

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
    currentNetwork,
    disconnect,
  }) => {
    const {
      provider,
    } =
      useContext(TransactionContext)

    const [copied, setCopied] = useState(false)
  
    const onCopied = () => {
      setCopied(true)
      setTimeout(function () {
        setCopied(false)
      }, 1000);
    }

    const getNetworkMenu = () => {
      return NETWORKS_AVAILABLE.find((network) => network.chainId === currentNetwork.chainId);
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={() => setOpen()} style={customStyles}>
        <ContainerModal>
          <HeaderModal>
            Account <VscChromeClose onClick={() => setOpen()} />
          </HeaderModal>
          <DetailsGroupModal>
            <DisconnectGroup>
              <ConnectWith>
                Connected with {provider}
              </ConnectWith>
              <DisconnectButton
                onClick={() => {
                  disconnect();
                }}
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
                <Helper
                 href={`${getNetworkMenu()?.changeNetworkParam?.blockExplorerUrls}/address/${currentAccount}`}
                 target='_blank'
                 rel='noreferrer'
                >
                  <HiExternalLink />&nbsp;&nbsp;View on Explorer
                </Helper>
              </HelperItem>
            </HelperGroup>
          </DetailsGroupModal>
        </ContainerModal>
      </Modal>
    )
  }

export default ModalAccount