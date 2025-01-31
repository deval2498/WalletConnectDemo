import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider, useAppKitNetworkCore, type Provider  } from '@reown/appkit/react'
import { BrowserProvider, Contract, parseEther } from 'ethers'
import { networks } from '../config'
import { useState } from 'react';

const BLABI = [
  'function mint(uint256 quantity) payable'
]

const ContractAddress = import.meta.env.CONTRACT_ADDRESS_TESTNET// for testnet

export const ActionButtonList =  () => {
    const { disconnect } = useDisconnect();
    const { open } = useAppKit();
    const { chainId } = useAppKitNetworkCore();
    const { switchNetwork } = useAppKitNetwork();
    const { isConnected,address } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider<Provider>('eip155')
    const [waitingForTransaction, setWaitingForTransaction] = useState(false)
    const [pastTx, setPastTx] = useState(null)

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    };

    // function to get the balance
    const handleMint = async() => {
      if (!isConnected) throw Error('User disconnected')
  
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      // The Contract object
      const quantity = 1
      const webxoticContract = new Contract(ContractAddress, BLABI, signer)
      const tx = await webxoticContract.mint(quantity, {
        value: parseEther((quantity * 0.02).toString())
      })
      setWaitingForTransaction(true)
      const receipt = await tx.wait();
      setWaitingForTransaction(false)
      setPastTx(receipt.hash)
    }
  return (
    <div >
      {isConnected ? (
        <div>
          <button onClick={() => open()}>Open</button>
          <button onClick={handleDisconnect}>Disconnect</button>
          <button onClick={() => switchNetwork(networks[1]) }>Switch</button>
          <button onClick={handleMint}>Mint NFT</button>
          {
            waitingForTransaction && <div>Loading...</div>
          }
          {
            pastTx && <div>
              Your most recent tx: {`https://sepolia.etherscan.io/tx/${pastTx}`}
            </div>
          }  
        </div>
      ) : null}
    </div>
  )
}
