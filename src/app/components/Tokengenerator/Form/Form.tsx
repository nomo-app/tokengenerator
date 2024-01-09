import React, {FormEvent, useContext, useEffect, useRef, useState} from 'react';
import {Field} from "../Field";
import {MintableField} from "../MintableField";
import {validateFormData} from "../validateFormData";
import {ABORT_GENERATION_ERROR, ids, localStoragePrefix, UNKNOWN_ERROR} from "../../../_constants/constants";
import {TokenSubmission} from "../../../_functions/buildQRCode";
import {TokenGeneratorContext} from "../Tokengenerator";
import {nomoGetWalletAddresses} from "nomo-webon-kit";
import {estimateGenerateToken, generateToken} from "../../../_functions/generateToken";
import {FormError} from "../../../_functions/Error/FormError";

export const Form = () => {
    const name = useRef<HTMLInputElement>(null)
    const symbol = useRef<HTMLInputElement>(null)
    const amount = useRef<HTMLInputElement>(null)
    const errorField = useRef<HTMLDivElement>(null)
    const items = [
        {
            label: 'Name',
            name: ids.nameField,
            ref: name
        },
        {
            label: 'Symbol',
            name: ids.symbolField,
            ref: symbol
        },
        {
            label: 'Amount',
            name: ids.amountField,
            ref: amount
        }
    ]
    const [mintable, setMintable] = useState<boolean>(true)
    const {setSubmission, setError, setPhase, setTokenAddress, error, phase} = useContext(TokenGeneratorContext)

    useEffect(() => {
        const errorFieldRef = errorField.current
        if (error && errorFieldRef) {
            errorFieldRef.scrollIntoView(true)
        }
    }, [error, errorField]);

    const onSubmit = async (event: any) => {
        event.preventDefault()
        const nameRef = name.current
        const symbolRef = symbol.current
        const amountRef = amount.current
        if (!nameRef || !symbolRef || !amountRef) return
        try {
            validateFormData({name: nameRef, symbol: symbolRef, amount: amountRef})
            const data = {
                name: nameRef.value,
                symbol: symbolRef.value.toUpperCase(),
                amount: amountRef.value,
                mintable: mintable
            }
            setSubmission(data)
            await generateTokenFromSubmission(data)
        } catch (e) {
            if (e instanceof FormError) {
                e.ref.setCustomValidity(e.message ?? UNKNOWN_ERROR)
                e.ref.reportValidity()
                e.ref.scrollIntoView(true)
                setError('')
                return
            }
            setError((e as Error)?.message ?? UNKNOWN_ERROR)
        }
    }

    const generateTokenFromSubmission = async (data: TokenSubmission) => {
        try {
            const nomoAddresses = await nomoGetWalletAddresses()
            await estimateGenerateToken({...data, to: nomoAddresses.walletAddresses['ETH']})
            setPhase('transaction_wait')
            const address = await generateToken({...data, to: nomoAddresses.walletAddresses['ETH']})
            setTokenAddress(address)
            setPhase('token')
        } catch (e: any) {
            setPhase('initial')
            if (e instanceof Error) {
                setError((e as Error)?.message ?? UNKNOWN_ERROR)
            } else if (e.nomoSignEvmTransaction) {
                setError(ABORT_GENERATION_ERROR)
            }
            else {
                setError(JSON.stringify(e))
            }
        }
    }

    const onInput = (e: FormEvent<HTMLInputElement>) => {
        localStorage.setItem(localStoragePrefix + e.currentTarget.id, e.currentTarget.value)
        setError('')
    }

    useEffect(() => {
        const nameRef = name.current
        const symbolRef = symbol.current
        const amountRef = amount.current
        if (!nameRef || !symbolRef || !amountRef) return
        const mintableDefault = localStorage.getItem('nomo_tg_mintable')
        setMintable(mintableDefault !== null ? JSON.parse(mintableDefault) : true)
        nameRef.value = localStorage.getItem(localStoragePrefix + ids.nameField) ?? ''
        symbolRef.value = localStorage.getItem(localStoragePrefix + ids.symbolField) ?? ''
        amountRef.value = localStorage.getItem(localStoragePrefix + ids.amountField) ?? ''
    }, [name, symbol, amount])


    return (phase === 'initial' ?
        <div className={'form-wrapper'}>
            <form action="">
                <h3 className="header">Tokengenerator</h3>
                <div className={'fields'}>
                    {items.map(item => <Field key={item.label} ref={item.ref} className={item.name} id={item.name} label={item.label} onInput={onInput}/>)}
                    <MintableField mintable={mintable} onClick={() => setMintable(mintable => !mintable)}
                                   onInput={() => setError('')}/>
                </div>
                <button className={'submit-button'} onClick={onSubmit}>Generate Token</button>
                <div ref={errorField} className={`error-field ${error ? 'visible' : ''}`}>{error}</div>
            </form>
        </div> : null
    );
}
