import React, {useCallback} from 'react'
import Image from 'next/image'
import Modal from 'react-modal'

import {
  getConnections,
} from "../../../connections";
import useAppDispatch from "../../../hooks/useAppDispatch";
import {
  setProvider,
  setWallet,
} from "../../../redux/slices/authenticate";

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
    closeModal,
  }) => {
      const dispatchStore = useAppDispatch();
      const connections = getConnections()?.filter(connection=>connection.shouldDisplay);

      const tryActivation = useCallback(
        async (connection) => {
          try {
            console.log("connection=>", connection);
            await connection?.connector?.activate()
            dispatchStore(setProvider(connection?.type));
            dispatchStore(setWallet(connection?.name));
          } catch (error) {
            console.error("tryActivation", error);
            //connection.connector.deactivate();
            //connection.connector.resetState()
          }
        },
        []
      )
 
    return (
      <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={customStyles}>
        <ContainerModal>
          <HeaderModal>
           Connect wallet <VscChromeClose onClick={() => closeModal()} />
          </HeaderModal>
          <Stack spacing={2} pt={1} pb={3}>
            {connections?.map((connection, index)=>{
              return (
                <Item
                key={index}
                onClick={() => {
                 tryActivation(connection);
                 closeModal();
               }}
               >
                  <Image alt={`${connection.name} wallet icon`} src={connection.icon} height={40} width={40} /> <Typography variant="subtitle1">{connection.name}</Typography>
                </Item>
              )
            })}
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