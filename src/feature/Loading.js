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
border: 5px solid #fff;
border-radius: 50%;
border-color: #fff transparent #fff transparent;
animation: spin 0.7s linear infinite;

@keyframes spin{
    to{
        transform: rotate(360deg);
    }
}
`
