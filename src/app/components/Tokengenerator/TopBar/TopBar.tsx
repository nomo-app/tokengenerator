import React, {Fragment, ReactNode, useContext, useState} from 'react';
import Image from "next/image";
import nomoImg from "../../../../../public/assets/favicon.ico";
import {Phase, TokenGeneratorContext} from "../Tokengenerator";
import {isMobile} from "react-device-detect";
import help from "../../../../../public/assets/help.svg";
import './TopBar.scss'
import {ids, localStoragePrefix} from "../../../_constants/constants";

export const TopBar = () => {
    const {setError, setSubmission, setPhase, setTokenAddress, phase} = useContext(TokenGeneratorContext)
    const onRefresh = () => {
        localStorage.setItem(localStoragePrefix + ids.amountField, '')
        localStorage.setItem(localStoragePrefix + ids.nameField, '')
        localStorage.setItem(localStoragePrefix + ids.symbolField, '')
        setError('')
        setSubmission({
            amount: '',
            mintable: true,
            name: '',
            symbol: ''
        })
        setPhase('initial')
        setTokenAddress('')
    }

    return (
        <div className={'topbar'}>
            <div className="nomo-logo">
                <Image src={nomoImg} fill={true} alt={'Zeniq Logo'}/>
            </div>
            {phase === 'token' && <button className={'primary-button'} onClick={onRefresh}>New Token</button>}
            <HelpButton/>
        </div>
    );
}

const helpText: Record<Phase, string | ReactNode> = {
    initial: 'Fill out the fields to create your own token on the ZENIQ Smartchain',
    transaction_wait: 'Wait until your token is generated...',
    token: <Fragment>
        To add your new token to the Nomo App, do the following:
        <ul>
            <li>Copy the shown address into the clipboard.</li>
            <li>Then go back to the nomo app home screen and click on the gear to get into your wallet preferences.</li>
            <li>Click "Add Custom Token".</li>
            <li>Make sure that the currently selected network is the ZENIQ Smartchain.</li>
            <li>Paste the address into the Token Contract Address field and click on Continue.</li>
            <li>Congratulations! You now have access to your new token!</li>
        </ul>
    </Fragment>

}
export const HelpButton = () => {
    const {phase} = useContext(TokenGeneratorContext)
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div className="help-button" onClick={() => {isMobile && setShowTooltip(!showTooltip)}} onMouseEnter={() => {
            !isMobile && setShowTooltip(true)
        }} onMouseLeave={() => {
            !isMobile && setShowTooltip(false)
        }}>
            <Image src={help} fill={true} alt={'Help Button'}/>
            { showTooltip && <div className="tooltip">{helpText[phase]}</div>}
        </div>
    )
}
