//import { Connector } from '@web3-react/types'
import { gnosisSafeConnection, networkConnection } from '../connections'
import { useGetConnection } from '../connections'
import { useEffect } from 'react'
//import { useAppDispatch, useAppSelector } from 'state/hooks'
//import { updateSelectedWallet } from 'state/user/reducer'
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  resetProvider,
  getProvider,
} from "../redux/slices/authenticate";

async function connect(connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function useEagerlyConnect() {
  const dispatchStore = useAppDispatch()

  const selectedWallet = useAppSelector(getProvider)
  const getConnection = useGetConnection()

  let selectedConnection;
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet)
    } catch {
      //dispatch(updateSelectedWallet({ wallet: undefined }))
      dispatchStore(resetProvider());
    }
  }

  console.log("useEagerlyConnect", selectedWallet, selectedConnection);

  useEffect(() => {
    connect(gnosisSafeConnection.connector)
    connect(networkConnection.connector)

    if (selectedConnection) {
      connect(selectedConnection.connector)
    }
  }, [])
}
