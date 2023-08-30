'use client'
import './Tokengenerator.scss'
import React, {useEffect, useRef, useState} from "react";
import {CoinContainer} from "./CoinContainer/CoinContainer";
import {TokenSubmission} from "../../_functions/buildQRCode";
import {TopBar} from "./TopBar/TopBar";
import {Form} from "./Form/Form";
import Loader from "./Loader/Loader";
import { injectNomoCSSVariables } from "nomo-plugin-kit/dist/nomo_theming";
export type Phase = 'initial' | 'transaction_wait' | 'token'

export const TokenGeneratorContext = React.createContext({
    phase: 'initial' as Phase,
    setPhase: (phase: Phase) => {},
    error: '',
    setError: (error: string) => {},
    submission: {
        name: '',
        symbol: '',
        amount: '',
        mintable: true
    },
    setSubmission: (submission: TokenSubmission) => {},
    tokenAddress: '',
    setTokenAddress: (address: string) => {}
})


export const Tokengenerator = () => {
    const [error, setError] = useState('')
    const [phase, setPhase] = useState<Phase>('initial')
    const [submission, setSubmission] = useState<TokenSubmission>({
        name: '',
        symbol: '',
        amount: '',
        mintable: true
    });
    const [tokenAddress, setTokenAddress] = useState('')

    useEffect(() => {
        injectNomoCSSVariables();
    }, [])

    return (
        <TokenGeneratorContext.Provider value={{phase, setPhase, error, setError, tokenAddress, setTokenAddress, submission, setSubmission}}>
            <div className={`background-wrapper phase-${phase}`}>
                <TopBar/>
                <div className={`token-generator-wrapper phase-${phase}`}>
                    <div className={`token-generator phase-${phase}`}>
                        { phase === 'initial' && <Form/> }
                        { phase === 'transaction_wait' && <Loader/> }
                        { phase === 'token' && <CoinContainer {...submission} contractAddress={tokenAddress}/> }
                    </div>
                </div>
            </div>
        </TokenGeneratorContext.Provider>
    )
}