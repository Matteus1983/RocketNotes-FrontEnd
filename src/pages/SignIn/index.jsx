import { useState } from 'react'
import { useAuth } from '../../hooks/auth'
// vou usar o mycontext, agr eu posso acessar o myContext devido o useContext

import { Container, Form, Background } from './styles'
import { FiMail, FiLock } from 'react-icons/fi'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'


export function SignIn(){
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const { signIn } = useAuth()

    function handleSignIn(){
        signIn({ email,password })
    }
    // funções que são disparadas em decorrência de uma interaçã com o usuário
 return(
 <Container>
    <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>

        <h2>Faça seu login</h2>

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

        <Button title='Entrar' onClick={handleSignIn}/>

        <Link to="/register">
            Criar conta
        </Link>
    </Form>    
    <Background />
 </Container>
 )
}