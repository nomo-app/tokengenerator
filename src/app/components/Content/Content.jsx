import React from 'react'
import './Content.scss'

const Content = ({flex, children}) => {
    return(
        <div id='content' className={"content " + (flex ? 'flex' : '')}>
            {children}
        </div>
    )
}

export default Content