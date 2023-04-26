import React,{
    useState,
  } from 'react';
 import { 
    FiCopy 
} from 'react-icons/fi';
import { BsCheck2Circle } from 'react-icons/bs';
import { 
    HiExternalLink } from 'react-icons/hi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NETWORKS_AVAILABLE } from '../../../utils/constants';
import Modal from 'react-modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useAppSelector from "../../../hooks/useAppSelector";
import {
  getWallet,
  getUserTokens,
  getNativeBalance,
  getNativeToken,
} from "../../../redux/slices/authenticate";

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
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    //Paper,
    Avatar,
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
    closeModal,
    userName,
    currentAccount,
    currentNetwork,
    disconnect,
  }) => {
    const wallet = useAppSelector(getWallet);
    const userTokens = useAppSelector(getUserTokens);
    const nativeBalance = useAppSelector(getNativeBalance);
    const nativeToken = useAppSelector(getNativeToken);

    const [copied, setCopied] = useState(false)
    const [value, setValue] = useState(0);

    const onCopied = () => {
      setCopied(true)
      setTimeout(function () {
        setCopied(false)
      }, 1000);
    }

    const getNetworkMenu = () => {
      return NETWORKS_AVAILABLE.find((network) => network.chainId === currentNetwork.chainId);
    };

    const getAllUserTokens = () => {
      const baseToken = {...nativeToken, balance: nativeBalance}
      const allTokens = [baseToken, ...userTokens]
      return allTokens;
    };

    const TabPanel = ()=> {

      return (
             <TableContainer>
              <Table sx={{ maxWidth: '100%' }} aria-label="token balances table">
              <TableBody>
              {getAllUserTokens()?.map((row, index) => (
          <TableRow
            key={`${row.symbol}-${index}`}
            sx={{ 'th': { border: 0 }, cursor: 'pointer', '&:hover': { background: 'rgba(201, 208, 231, 0.08)' } }}
          >
            <TableCell component="th" scope="row">
              <Avatar alt={row?.name} src={row?.logo}>
                {!row?.logo && row?.symbol?.charAt(0)?.toUpperCase()}
              </Avatar>
            </TableCell>
            <TableCell sx={{ width: '100%' }} component="th" scope="row">
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>{row.name}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'rgb(94, 104, 135)' }}>{parseFloat(row?.balance?.formatted).toFixed(6)}&nbsp;&nbsp;{row?.symbol}</Typography>
            </TableCell>
          </TableRow>
        ))}
              </TableBody>
              </Table>
            </TableContainer>
      );
    }

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  
    return (
      <Modal isOpen={isOpen} onRequestClose={() => closeModal()} style={customStyles}>
        <ContainerModal>
          <HeaderModal>
            Account <VscChromeClose onClick={() => closeModal()} />
          </HeaderModal>
          <DetailsGroupModal>
            <DisconnectGroup>
              <ConnectWith>
                Connected with {wallet}
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
          <DetailsGroupModal>
          <Box sx={{ width: '100%' }}>
      <Box 
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tabs 
       value={value} 
        onChange={handleChange} 
        aria-label="token balance details tabs"
        >
          <Tab label="Assets" />
        </Tabs>
      </Box>
      <TabPanel />
    </Box>
          </DetailsGroupModal>
        </ContainerModal>
      </Modal>
    )
  }

export default ModalAccount