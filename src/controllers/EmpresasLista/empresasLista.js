import React, { useState, useEffect } from "react";
import '../EmpresasLista/empresasLista.css';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import host from "../../components/Host/host";

export default function EmpresasLista() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const idUsuario = localStorage.getItem('idUsuario'); // Recupera o idUsuario do localStorage

            if (idUsuario) {
                try {
                    const response = await axios.get(`${host.API_BASE_URL}/empresa/listarempresauser/${idUsuario}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setEmpresas(data);
                    } else {
                        console.error('Erro ao buscar dados das empresas');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados das empresas', error);
                }
            } else {
                console.error('idUsuario não encontrado no localStorage');
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (idEmpresa) => {
        try {
            const response = await axios.delete(`${host.API_BASE_URL}/empresa/excluir/${idEmpresa}`);
            if (response.status === 200) {
                // Atualize a lista de empresas após a exclusão
                const updatedEmpresas = empresas.filter(empresa => empresa.idEmpresa !== idEmpresa);
                setEmpresas(updatedEmpresas);
            } else {
                console.error('Erro ao excluir a empresa');
            }
        } catch (error) {
            console.error('Erro ao excluir a empresa', error);
        }
    };

    return (
        <div className="container-empresasLista">
            {empresas.map((empresa, index) => (
                <Link key={index} to={`/relatorioInfo/${empresa.idEmpresa}`}>
                    <div key={index} className="lista">
                        <div className="empresasLista">
                            <div className="item1">
                                <h3 className="sub">{empresa.razaoSocial}</h3>
                            </div>
                            <Link to='/Home'>
                                <button onClick={() => handleDelete(empresa.idEmpresa)}>
                                    <FaTrash className="btn-delete" />
                                </button>
                            </Link>
                        </div>
                        <div className="item2">
                            <h3 className="sub">{empresa.tipoServico}</h3>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
