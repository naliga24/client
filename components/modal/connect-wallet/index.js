import React, {useContext} from 'react'
import Image from 'next/image'
import Modal from 'react-modal'
import metamaskLogo from '../../../assets/mm.png';
import { TransactionContext } from '../../../context/TransactionContext'

Modal.setAppElement('#__next')

import {
    ContainerModal,
    HeaderModal,
    VscChromeClose,
    Stack,
    Item,
    Typography,
    StyledLink,
    TypographyLegalDocs,
  } from "./style";

const customStyles = {
    content: {
      top: '50%',
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
  }) => {
    const {
      setProvider,
      connectWalletWeb3,
    } =
      useContext(TransactionContext)
 
    return (
      <Modal isOpen={isOpen} onRequestClose={() => setOpen()} style={customStyles}>
        <ContainerModal>
          <HeaderModal>
           Connect wallet <VscChromeClose onClick={() => setOpen()} />
          </HeaderModal>
          <Stack spacing={2} pt={1} pb={3}>
           <Item
                           onClick={() => {
                            connectWalletWeb3();
                            setOpen();
                            setProvider("MetaMask");
                          }}
           >
<Image src={metamaskLogo} height={40} width={40} />             <Typography variant="subtitle1">MetaMask</Typography>
           </Item>
           {/* <Item
           >
           <Image src={walletConnectLogo} height={40} width={40} />  <Typography variant="subtitle1">Wallet Connect</Typography>
</Item>
<Item
>
<Image src={coinbaseLogo} height={40} width={40} />  <Typography variant="subtitle1">Coinbase Wallet</Typography> 
</Item> */}
          </Stack>
          <TypographyLegalDocs variant="body1">
          By connecting a wallet, you agree to 3ether.io 
          <StyledLink 
          href="/"> Terms of Service</StyledLink> and consent to its 
          <StyledLink href="/"> Privacy Policy</StyledLink>.
            </TypographyLegalDocs> 
        </ContainerModal>
      </Modal>
    )
  }

export default ModalAccount