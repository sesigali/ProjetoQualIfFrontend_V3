import React, { useState } from 'react'
import MaskInput from '../../components/MaskInput/maskInput'

export default function MaskCnpj() {
  const [cnpj, setCnpj] = useState('');
  console.log(cnpj);

  function handleChange(e){
    setCnpj(e.target.value);
  }

  return (

    <div>
      <MaskInput
        name="cnpj"
        mask="99.999.999/9999-99"
        value={cnpj}
        onChange={handleChange}
      />

      <button onClick={() => setCnpj('')}>Cadastrar</button>
    </div>

  )
}
