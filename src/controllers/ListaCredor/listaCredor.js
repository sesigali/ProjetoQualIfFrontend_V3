import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importação da biblioteca xlsx
import Footer from '../../components/Footer/footer';
import './StyleListaCredor.css';
import NavbarCadastro from '../../components/Navbar/navbar-cadastro/navbar-cadastro';

export default function ListaCredor() {
  // Estado para armazenar os dados do Excel após leitura
  const [fileData, setFileData] = useState([]);
  const [error, setError] = useState('');

  // Função para processar o arquivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    // Checa se algum arquivo foi enviado
    if (!file) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    const reader = new FileReader();
    // Quando o arquivo for carregado no FileReader
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      try {
        // Lê o arquivo Excel usando a biblioteca xlsx
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Seleciona a primeira aba
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Converte para JSON
        setFileData(data); // Define os dados em estado
        setError(''); // Limpa os erros
      } catch (err) {
        console.error('Erro ao processar o arquivo:', err);
        setError('Erro ao processar o arquivo. Verifique o formato.');
      }
    };

    reader.readAsBinaryString(file);
  };

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
            <button className="button-lista-buscar">Buscar</button>
          </label>

          {error && <p className="error-message">{error}</p>}

          <button className="button-lista-conf">Configurar Lista</button>
        </div>

        <div className="result-container">
          <h3 className="result-title">Dados do Arquivo Excel:</h3>
          {fileData.length > 0 ? (
            <table className="result-table">
              <thead>
                <tr>
                  {fileData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fileData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell || '-'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">Nenhum dado carregado.</p>
          )}<br/><br/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
