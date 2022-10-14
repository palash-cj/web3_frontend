import Head from 'next/head'
import { useState,useEffect } from 'react'
import "bulma/css/bulma.css"
import Web3 from "web3"
import vendingMachineContract from "../blockchain/vending"
import styles from "../styles/vendingMachine.module.css"


const vendingMachine=()=>{
    const [error,setError]=useState('')
    const [successMsg,setSuccessMsg]=useState('')
    const [inventory, setInventory]=useState('')
    const [myDonutCount, setMyDonutCount]=useState('')
    const [buyCount,setBuyCount]=useState('')
    const [web3, setWeb3]= useState(null)
    const [address, setAddress]=useState(null)
    const [vmContract,setVmContract]=useState(null)
    // const [purchase, setPurchase]=useState(0)

    //window.ethereum
    // let web3

    useEffect(()=>{
       
        if(vmContract) getInventoryHandler()  
        if(vmContract && address) getMyDonutCountHandler() 
    },[vmContract,address])
    const getInventoryHandler=async ()=>{
        const inventory = await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }

    const getMyDonutCountHandler = async ()=>{
        
        const count = await vmContract.methods.donutBalances(address).call()
        setMyDonutCount(count)
    }


    const updateDonutQty = event =>{
        console.log(`Donut Qty :: ${event.target.value}`)
        setBuyCount(event.target.value)
    }
    const buyDonutHandler =async ()=>{
        try{
            // const account = await web3.eth.getAccounts()
            await vmContract.methods.purchase(buyCount).send({
            from : address,
            value : web3.utils.toWei('0.01', 'ether')* buyCount
            })
            // setPurchase(purchase++)
            setSuccessMsg(`${buyCount} donuts purchased!`)

            if(vmContract) getInventoryHandler()  
            if(vmContract && address) getMyDonutCountHandler()
        }catch(err){
            setError(err.message)
        }
        
    }

    const connectWalletHandler=async ()=>{
        // Check if MetaMask is installed
        if(typeof window!== "undefined" && typeof window.ethereum!=="undefined"){
            try{
                // request wallet connect
                await window.ethereum.request({method: "eth_requestAccounts"})
                // Set web3 instance
                web3 = new Web3(window.ethereum);
                setWeb3(web3)
                // get list of accounts
                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0])

                // create local contract copy
                const vm = vendingMachineContract(web3)
                setVmContract(vm)

                alert("Connected to MetaMask Wallet!")
            }catch(err){
                setError(err.message);
                alert("Failed to connect MetaMask!")
            }
        }else {
            console.log("Please install metamask!")
            alert("Install MetaMask!")
        }
    }
   return (

    
    <div className={styles.main}>
        <Head>
            <title>Web 3 App</title>
            <meta name="description" content="A Decentralised App" />
        </Head>
        <nav className="navbar mt-4 mb-4">
            <div className='container'>
                <div className='navbar-name'>
                    <h1>Web3 Vending Machine</h1>
                </div>
                <div className='navbar-end'>
                    <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet</button>
                </div>
            </div>
        </nav>
        <section>
            <div className='container'>
                <h2>Vending Machine Inventory : {inventory}</h2>
            </div>
        </section>
        <section>
            <div className='container'>
                <h2>My Donut: {myDonutCount}</h2>
            </div>
        </section>
        <section className='mt-5'>
            <div className='container'>
                <div className='field'>
                    <label className='label'>Buy Donuts</label>
                    <div className='control'>
                        <input onChange={updateDonutQty} className='input' type="type" placeholder='Enter Amount...'/>
                    </div>
                    <button onClick={buyDonutHandler} className='button is-primary mt-2'>Buy</button>

                </div>
            </div>
        </section>
        
        <section>
            <div className='container has-text-danger'>
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className='container has-text-success'>
                <p>{successMsg}</p>
            </div>
        </section>
    </div>
   )
}
export default vendingMachine