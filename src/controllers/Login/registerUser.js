import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import './loginRegisterUser.css'
import { FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';
import host from '../../components/Host/host';

export default function RegisterUser() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!email || !senha || !senhaConf) {
            setError('Preencha todos os campos');
            return;
        }

        else if (senha !== senhaConf) {
            setError("Senhas não são iguais");
            return;
        }

        try {
            const response = await axios.post(`${host.API_BASE_URL}/usuario/adicionar`, { email, senha });
            if (response.status === 201) {
                alert("Usuário Cadastrado com sucesso!");
                navigate("/login");
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

                    <Input
                        type="password"
                        placeholder="Confirme sua Senha"
                        value={senhaConf}
                        onChange={(e) => [setSenhaConf(e.target.value), setError("")]}
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