import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react"
import Siderbar from './Siderbar';
import Feed from './Feed';
import Widgets from './Widgets';

function App() {

  const [currentAccount,setCurrentAccount]=useState("")
  const [correctNetwork,setCorrectNetwork]=useState(false)

  //Call Metamask to connect wallet on clicking Connet Wallet Button
   const connectWallet=async()=>{
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      console.log('Connected to chain:' + chainId)

      const nextchain = '0xaa36a7'

      if (chainId !== nextchain) {
        alert('You are not connected to the Rinkeby Testnet!')
        setCorrectNetwork(false)
        return
      }else{
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])

    } catch (error) {
      console.log(error);
    }
   }

   useEffect(()=>{
    connectWallet()
   },[])

  return (
     // BEM
     <div>
     {currentAccount === '' ? (
       <button
       className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
       onClick={connectWallet}
       >
       Connect Wallet
       </button>
       ) : correctNetwork ? (
         <div className="app">
           <Siderbar />
           <Feed />
           <Widgets />
         </div>
       ) : (
       <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
       <div>----------------------------------------</div>
       <div>Please connect to the NextPay Testnet</div>
       <div>and reload the page</div>
       <div>----------------------------------------</div>
       </div>
     )}
     </div>
 
  );
}

export default App;
