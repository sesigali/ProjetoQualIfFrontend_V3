import React from 'react';
import ReactInputMask from 'react-input-mask';
import '../MaskInput/maskInput.css'

//TODA VEZ QUE ENCONTRAR O QUE NÃO FOR DE 0 A 9 IRÁ SUBSTITUIR POR UMA STRING VÁZIA.
const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

export default function MaskInput({ value, onChange, mask, name, placeholder, required}) {

    //****LIMPANDO OS DADOS
    function handleChange(e){
        onChange({
            ...e,
            target: {
                ...e.target,
                name,
                placeholder,
                required,
                value: onlyNumbers(e.target.value),
            }
        });
    }

    return (
        <ReactInputMask className='input'
            name={name}
            mask={mask}
            value={value}
            onChange={handleChange}
            placeholder='CNPJ'
            required={required}
            
        />
    )
}
