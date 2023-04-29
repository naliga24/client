import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import {
  getConnections
} from "../connections/";
import { useMemo, useEffect } from 'react';
import useEagerlyConnect from '../hooks/useEagerlyConnect'

const ConnectorsProvider = ({ children })=> {
  useEagerlyConnect();
  const connections = getConnections();
  const key = useMemo(() => connections.map((connection) => connection.name).join('-'), [connections]);
  const connectors = connections.map(({ hooks, connector }) => [connector, hooks]);

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
       <Tracer />
      {children}
    </Web3ReactProvider>
  )
}

function trace(event) {
  if (event.action !== 'request') return
  const { method, id, params } = event.request
  console.groupCollapsed(method, id)
  console.debug(params)
  console.groupEnd()
}


function Tracer() {
  const { provider } = useWeb3React()

  useEffect(() => {
    provider?.on('debug', trace)
    return () => {
      provider?.off('debug', trace)
    }
  }, [provider])

  return null
}

export default ConnectorsProvider