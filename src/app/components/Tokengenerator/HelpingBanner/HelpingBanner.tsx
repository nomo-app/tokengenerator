import Image from "next/image";
import cross from "../../../../../public/assets/cross-svgrepo-com.svg";
import React, {useContext, useState} from "react";
import {Phase, TokenGeneratorContext} from "../Tokengenerator";
import './HelpingBanner.scss'

const bannerText: Record<Phase, string> = {
    initial: 'Fill out the fields to create your own token on the ZENIQ Smartchain',
    transaction_wait: '',
    token: 'Add a custom token to your Nomo App by clicking "Add Token" and entering the token address shown below.'
}

export const HelpingBanner = () => {
    const {phase} = useContext(TokenGeneratorContext)
    const [bannerMode, setBannerMode] = useState<'visible' | 'hidden'>('visible')
    return (
        <div className={`helping-banner banner-${bannerMode}`} onClick={() => setBannerMode('hidden')}>
            <div className='banner'>
                <div>{bannerText[phase]}</div>
            </div>
            <div className="close" onClick={() => setBannerMode('hidden')}>
                <Image src={cross} width={20} height={20} alt={'Hide Banner Button'}/>
            </div>
        </div>
    )
}