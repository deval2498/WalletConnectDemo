import { createAppKit } from '@reown/appkit/react'
import { networks, projectId, metadata, ethersAdapter } from './config'
import { ActionButtonList } from './components/ActionButtonList'

import "./App.css"

// Create a AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true, // Optional - defaults to your Cloud configuratio
    email: false,
    socials: false
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export function App() {

  return (
    <div className={"pages"}>
      <img src="/reown.svg" alt="Reown" style={{ width: '150px', height: '150px' }} />
      <h1>Contract Signer</h1>
          <appkit-button />
          <ActionButtonList/>
          {/* <InfoList hash={transactionHash} signedMsg={signedMsg} balance={balance}/> */}
    </div>
  )
}

export default App
