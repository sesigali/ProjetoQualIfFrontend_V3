// import React, { useState } from 'react';
// import { processarArquivoExcel } from '../../controllers/ListaCredor/processarDados';

// function UploadListaCredor() {
//     const [dados, setDados] = useState([]);
//     const [mensagem, setMensagem] = useState('');

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) {
//             setMensagem('Por favor, selecione um arquivo.');
//             return;
//         }

//         try {
//             const dadosProcessados = await processarArquivoExcel(file);
//             setDados(dadosProcessados);
//             setMensagem('Arquivo processado com sucesso!');
//         } catch (error) {
//             setMensagem(error.message);
//         }
//     };

//     return (
//         <div>
//             <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
//             {mensagem && <p>{mensagem}</p>}
//             <div>
//                 {dados.length > 0 && (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>CPF</th>
//                                 <th>Banco</th>
//                                 <th>Agência</th>
//                                 <th>Conta</th>
//                                 <th>Valor</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {dados.map((dado, index) => (
//                                 <tr key={index}>
//                                     <td>{dado.cpf}</td>
//                                     <td>{dado.banco}</td>
//                                     <td>{dado.agencia}</td>
//                                     <td>{dado.conta}</td>
//                                     <td>{dado.valor}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UploadListaCredor;