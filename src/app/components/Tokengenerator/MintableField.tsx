import React, {ComponentProps, useEffect} from "react";
import './MintableField.scss'
import {useFirstRender} from "../../hooks/useFirstRender";

interface MintableFieldProps extends ComponentProps<'div'> {
    mintable: boolean
}
export const MintableField = (props: MintableFieldProps) => {
    const {mintable = true, ...restProps} = props
    const firstRender = useFirstRender()


    useEffect(() => {
        if (firstRender) return
        localStorage.setItem('nomo_tg_mintable', JSON.stringify(mintable))
    }, [mintable])

    return (
        <div className={`field-input mintable-${mintable.toString()}`}>
            <div className="label radio">Mintable</div>
            <div {...restProps} className={`toggle-switch mintable-${mintable.toString()}`}>
                <div className="toggle"/>
                <div className="checkmark"/>
                <div className="cross"/>
            </div>
        </div>
    )
}