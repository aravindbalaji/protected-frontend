import { css } from "@emotion/css";
import React from "react";

const ABCard = ({children}) => {
    return (
        <div className={cardCss}>
            {children}
        </div>
    )
}

const cardCss = css`
    border: 1px solid #ccc;
    padding: 10px;
`

export { ABCard }