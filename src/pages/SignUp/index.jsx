import { useState } from 'react'
// hooks criar estados, pegar informações de forma dinâmica
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Container, Form, Background } from './styles'
import { Input } from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { api } from "../../services/api";
import { Button } from '../../components/Button'


export function SignUp(){
    const [name, setName] = useState("");
    // guardar o nome do usuário, 'name' <- nome do estado / nome da função que vai atualizar esse estado chamado "name" só que para diferenciar usa o " set " -> " setName "
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email || !password){
            return alert("Preencha todos os campos!");
        }

        api.post("/users", { name, email, password })
        .then(() => {
            alert("Usuário cadastrado com sucesso")
            navigate('/');
        })
        .catch(error => {
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("Não foi possivel cadastrar");
            }
        })
    }
 return(
 <Container>
     <Background />
    <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Crie sua conta</h2>

        <Input
        placeholder='Nome'
        type='text'
        icon={FiUser}
        onChange={e => setName(e.target.value)}
        // toda vez que o valor do input muda, dispara um evento " e "
        />

        <Input
        placeholder='E-mail'
        type='text'
        icon={FiMail}
        onChange={e => setEmail(e.target.value)}
        />
        
        <Input
        placeholder='Senha'
        type='password'
        icon={FiLock}
        onChange={e => setPassword(e.target.value)}
        />

        <Button title='Cadastrar' onClick={handleSignUp}/>

        <Link to="/">
            Voltar para o login
        </Link>
    </Form>    
   
 </Container>
 )
}