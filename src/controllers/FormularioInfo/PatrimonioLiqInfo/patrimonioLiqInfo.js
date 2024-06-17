import React, { useState, useEffect } from 'react';

export default function PatrimonioLiqInfo({ 
  valorEstimadoContrato,
  patrimonioLiquido,
}) {
  //const [patrimonioLiquido, setPatrimonioLiquido] = useState('');
  const [indiceResult, setIndiceResult] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setErro(null); // Limpa o erro a cada nova avaliação

    // Verifique se valorEstimadoContrato foi fornecido e é um número válido
    if (!valorEstimadoContrato || isNaN(valorEstimadoContrato)) {
      setErro('Por favor, forneça um valor válido para o Valor Estimado do Contrato.');
      return;
    }

    if (!patrimonioLiquido || isNaN(patrimonioLiquido)) {
      setErro('Por favor, forneça um valor válido para o Valor Estimado do Contrato.');
      return;
    }

    // Converte o valor estimado para número
    const valorEstimadoNum = parseFloat(valorEstimadoContrato);

    // Calcula o requisito mínimo de 10% do valor estimado
    const requisitoMinimo = (10 / 100) * valorEstimadoNum;

    // Verifica se o Patrimônio Líquido foi preenchido
    if (patrimonioLiquido !== '') {
      // Converte o Patrimônio Líquido para número
      const patrimonioLiquidoNum = parseFloat(patrimonioLiquido);

      // Verifica se o Patrimônio Líquido atende ao requisito mínimo
      const atendeRequisitos = patrimonioLiquidoNum >= requisitoMinimo;

      // Calcula a porcentagem em relação ao valor estimado
      const porcentagemPatrimonio = (patrimonioLiquidoNum / requisitoMinimo) * 100;

      // Define o resultado no índice
      setIndiceResult({
        requisitoMinimo,
        atendeRequisitos,
        porcentagemPatrimonio,
      });
    }
  }, [valorEstimadoContrato, patrimonioLiquido]);

  return (
    <div>
      <h1 className="title-info">Patrimônio Líquido</h1>
      <p>Comprovação de patrimônio líquido de 10% (dez por cento) do valor total estimado da <br/>contratação ou do item pertinente.</p>
      <div className='patrimonioInfo'>
        <label>Valor Estimado do Contrato: R$ </label>
        <span>{valorEstimadoContrato.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
      <div className='patrimonioInfo'>
        <label>Patrimônio Líquido: R$ </label>
        <span>{patrimonioLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
      {indiceResult && (
        <div>
          <p><h4>Resultados</h4></p>
          <p>Requisito Mínimo de 10% do PL: R$ {indiceResult.requisitoMinimo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p>Atende ao Requisito: <span className={indiceResult.atendeRequisitos ? "texto-azul" : "texto-vermelho"}>{indiceResult.atendeRequisitos ? "Sim" : "Não"}</span></p>
          <p>Taxa da Empresa: {indiceResult.porcentagemPatrimonio.toFixed(2)}%</p>
        </div>
      )}

    </div>
  );
}
