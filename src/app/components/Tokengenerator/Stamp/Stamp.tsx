import Image from "next/image";
import nomoImg from "../../../../../public/assets/favicon.ico";
import React, {useEffect, useRef} from "react";
import './Stamp.scss'

const stampSoundPath = '../../assets/stamp.mp3' // "../../../../../public/assets/stamp.mp3";


export const Stamp = () => {
    const soundRef = useRef<HTMLAudioElement>(null)
    useEffect(() => {
        const timeout = setTimeout(() => {
            soundRef.current?.play()
        }, 900)
        return () => {
            clearTimeout(timeout)
        }
    }, []);
    return (
        <div className="stamp">
            <div className="image">
                <Image src={nomoImg} fill={true} alt={'Token Stamp'}/>
            </div>
            <audio ref={soundRef} id={'stamp-sound'} style={{display: 'none'}} controls>
                <source src={stampSoundPath} type="audio/mp3"/>
            </audio>
        </div>
    )
}