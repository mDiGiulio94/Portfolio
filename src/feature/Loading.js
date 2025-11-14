import styled, { keyframes } from "styled-components"

export default function Loading(){
    return (

        <SpinnerCustom>

        </SpinnerCustom>
    )
}

const SpinnerCustom = styled.div`
width: 45px;
aspect-ratio: 1/1;
border: 5px solid var(--color-text-loader) ;
border-radius: 50%;
border-color:var(--color-text-loader) transparent var(--color-text-loader) transparent;
animation: spin 0.7s linear infinite;

@keyframes spin{
    to{
        transform: rotate(360deg);
    }
}
`
