import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import './loginRegisterUser.css'
import { FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';

export default function RegisterUser() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!email || !senha) {
            setError('Preencha todos os campos');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8888/usuario/adicionar',{ email, senha });
            if (response.status === 201) {
                alert("Usuário Cadastrado com sucesso!");
                navigate("/Home");
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.Erro);
            } else {
                setError("Erro ao cadastrar usuário");
            }
        }
        
    };


    return (
        <div>
            <Link to='/'>
                <FaRegWindowClose className='btn-exit1' title='Voltar página principal' />

            </Link>

            <div className="container-login">

                <div className="content-login">

                    <label className="label-login">REGISTRAR LOGIN</label>
                    
                    <Input
                        type="email"
                        placeholder="Digite seu E-mail"
                        value={email}
                        onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />
                    <Input
                        type="password"
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={(e) => [setSenha(e.target.value), setError("")]}
                    />
            
                    <label className="label-erro">{error}</label>

                    <Button Text="Inscrever-se" onClick={handleRegister} />

                    <label className="label-registrar">
                        <span className="span-registrar1">Já tem uma conta?</span>
                        <Link to='/login' className="span-registrar2" >
                            <span >&nbsp;Entre</span>
                        </Link>
                    </label>


                </div>

            </div>

        </div>
    )
}