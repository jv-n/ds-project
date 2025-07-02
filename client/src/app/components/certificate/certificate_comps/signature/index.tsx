import * as React from "react";
import { segoeUI } from "../../index";

export interface SignatureProps {
   orgao: string;   
   cargo: string;
}

export default function Signature(props: SignatureProps) {
    return (
       <div className='inline-block items-center justify-center w-full'>
            <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '7px', color: '#4A5565', marginTop: '4px', borderTop: '2px solid #D1D5DC' }}>
               {props.orgao}
            </div>
            <div className={segoeUI.className} style={{ fontWeight: '400', fontSize: '7px', color: '#4A5565'}}>
                {props.cargo}
            </div>
        </div>
    );
}
