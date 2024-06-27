import React, {Fragment, useContext, useEffect, useRef} from 'react';
import QRCode from "react-qr-code";
import './CoinContainer.scss'
import {TokenGeneratorContext} from "@/app/components/Tokengenerator/Tokengenerator";
const coinSoundPath = "/assets/coin.wav";

interface TokenData {
    name: string,
    symbol: string,
    amount: string,
    contractAddress: string,
    mintable: boolean
}
export function CoinContainer(props: TokenData) {
    const {name, symbol, amount, mintable, contractAddress} = props
    const soundRef = useRef<HTMLAudioElement>(null)
    const { phase } = useContext(TokenGeneratorContext)

    useEffect(() => {
        if (phase !== 'token') return
        const timeout = setTimeout(() => {
            soundRef.current?.play()
        }, 2000)
        return () => clearTimeout(timeout)
    }, []);

    return (
        <Fragment>
            <div className={`coin-container phase-${phase}`}>
                <div className="name">{name}</div>
                <div className="token">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        }}>
                        <div>{`Name: ${name}`}</div>
                        <div>{`Symbol: ${symbol}`}</div>
                        <div>{`Contract address: ${contractAddress}`}</div>
                    </div>
                    <audio ref={soundRef} id={'coin-sound'} style={{display: 'none'}} controls>
                        <source src={coinSoundPath} type="audio/wav"/>
                    </audio>
                </div>
                <div className="contract-address">{contractAddress}</div>
                {/*<button className={'primary-button'} onClick={async () => {*/}
                {/*    console.log(contractAddress)*/}
                {/*    await navigator.clipboard.writeText(contractAddress || 'ERROR')*/}
                {/*    console.log()*/}
                {/*}}>Copy Address</button>*/}
            </div>
            { phase === 'token' && <div className={'coin-container-shadow'}/> }
        </Fragment>
    );
}