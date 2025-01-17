import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Footer from '../../components/Footer/footer';
import './StyleListaCredor.css';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';

export const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '').padStart(11, '0');
};

export const formatarBanco = (banco) => {
    if (!banco) return '';
    return banco.toString().padStart(3, '0');
};

export const formatarAgencia = (agencia) => {
    if (!agencia) return '';
    let formattedAgencia = agencia.toString().replace(/\D/g, '').padStart(4, '0');
    if (formattedAgencia === '9999' || formattedAgencia === '0999' || formattedAgencia === '999') {
      formattedAgencia = '0001';
    }
    return formattedAgencia;
};

export const formatarConta = (conta) => {
    if (!conta) return '';
    return conta.toString().replace(/\D/g, '');
};

export const formatarValor = (valor) => {
  if (!valor) return '';
  return (valor * 100).toString().replace(/\D/g, ''); //GAMBIARRA
};


export default function ListaCredor() {
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');
  const [copiedBlocks, setCopiedBlocks] = useState([]);

  const columnPositions = {
    CPF: 0,
    BANCO: 1,
    AGENCIA: 2,
    CONTA: 3,
    VALOR: 5,
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      try {
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const formattedData = data.map((row, rowIndex) => {
          if (rowIndex === 0) return row;
          return row.map((cell, cellIndex) => {
            if (cellIndex === columnPositions.CPF) {
              return formatarCPF(cell);
            } else if (cellIndex === columnPositions.BANCO) {
              return formatarBanco(cell);
            } else if (cellIndex === columnPositions.AGENCIA) {
              return formatarAgencia(cell);
            } else if (cellIndex === columnPositions.CONTA) {
              return formatarConta(cell);
            } else if (cellIndex === columnPositions.VALOR) {
              return formatarValor(cell);
            }
            return cell;
          });
        });

        setFileData(formattedData);
        setError('');
      } catch (err) {
        console.error('Erro ao processar o arquivo:', err);
        setError('Erro ao processar o arquivo. Verifique o formato.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const copiarBloco = (bloco, blocoIndex) => {
    const indiceCPF = fileData[0].indexOf('CPF');
    const indiceVariacao = fileData[0].indexOf('VARIAÇÃO');

    const conteudo = bloco.map(linha => {
        let novaLinha = [...linha];
        
        if (indiceCPF !== -1) {
            novaLinha = [...novaLinha.slice(0, indiceCPF + 1), '', '', '', ...novaLinha.slice(indiceCPF + 1)];
        }
        
        if (indiceVariacao !== -1) {
            novaLinha = [...novaLinha.slice(0, indiceVariacao + 4), '', '', '', '', '', '', '', ...novaLinha.slice(indiceVariacao + 4)];
        }
        
        return novaLinha.join('\t');
    }).join('\n\n');

    navigator.clipboard.writeText(conteudo)
      .then(() => setCopiedBlocks([...copiedBlocks, blocoIndex]))
      .catch(() => alert('Erro ao copiar os dados.'));
  };

  const blocos = [];
  for (let i = 1; i < fileData.length; i += 7) {
    blocos.push(fileData.slice(i, i + 7));
  }

  return (
    <div className='container-lista1'>
      <NavbarCadastro /><br/>

      <div className="container-lista2">
        <div className="lista1">
          <iframe
            className="video-lista"
            width="360"
            height="200"
            src="https://www.youtube.com/embed/DD3amWHThKk?si=aWNvh0A1XmRaF1h7"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          
          <label className="label-lista">
            <input
              className="input-lista"
              type="file"
              accept=".xls, .xlsx"
              onChange={handleFileUpload}
            />
          </label>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="result-container">
          <h3 className="result-title">Dados do Arquivo Excel:</h3>
          {fileData.length > 0 ? (
            <div className="blocos-container">
              {blocos.map((bloco, blocoIndex) => (
                <div
                  key={blocoIndex}
                  className={`bloco ${copiedBlocks.includes(blocoIndex) ? 'copied' : ''}`}
                >
                  <div className="bloco-header">
                    <span className="bloco-numero">Bloco {blocoIndex + 1}</span>
                    <button
                      className="bloco-copiar"
                      onClick={() => copiarBloco(bloco, blocoIndex)}
                    >
                      Copiar
                    </button>
                  </div>
                  <table className="bloco-tabela">
                    <thead>
                      <tr>
                        {fileData[0].map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bloco.map((linha, linhaIndex) => (
                        <tr key={linhaIndex}>
                          {linha.map((celula, celulaIndex) => (
                            <td key={celulaIndex}>{celula || '-'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">Nenhum dado carregado.</p>
          )} <br/><br/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
