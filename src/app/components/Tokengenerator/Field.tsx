'use client'

import React, {forwardRef} from "react";

interface FieldProps extends React.ComponentPropsWithRef<'input'> {
    label: string,
}

export const Field = forwardRef((props: FieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const {label, className, ...rest} = props

    return (
        <div className={`field-input ${className}`}>
            <label className="label">{label}</label>
            <input ref={ref} type="text" autoComplete="off" autoCorrect="off" {...rest}/>
        </div>
    )
})