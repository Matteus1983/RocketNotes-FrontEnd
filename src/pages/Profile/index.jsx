import { useState } from 'react'
import { useAuth } from '../../hooks/auth'
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Avatar} from './styles'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { api } from '../../services/api'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function Profile(){
    const { user, updateProfile } = useAuth();
    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [passwordOld,setPasswordOld] = useState();
    const [passwordNew,setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`: avatarPlaceholder;
    // Se tiver imagem salva, vai usar ela, caso não, vai usar a imagem de PlaceHolder
    const [avatar,setAvatar] = useState(avatarUrl);
    // se o usuário já tiver um avatar, vai ficar aqui.
    const [avatarFile,setAvatarFile] = useState(null);
    // para carregar a nova imagem selecionado do usuário 4*

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    async function handleUpdate(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }
        const userUpdated = Object.assign(user, updated);
        // passando oque tem de atualizado e o user em si.

        await updateProfile({ user: userUpdated, avatarFile })
    }

    function handleChangeAvatar(event){
        // event de alteração do avatar
        const file = event.target.files[0];
        // extrair o arquivo, e pegar a primeira posição 2*
        setAvatarFile(file);
        // colocar aqui a nova imagem do usuário 3*
        const imagePreview = URL.createObjectURL(file);
        // toda vez q o usuário mudar de imagem, geral uma URL para mudar o state 5*
        setAvatar(imagePreview);
        // vai passar como paramêtro a nova imagem para o set Avatar 
    }

    return(
        <Container>
            <header>
                <button type='button' onClick={handleBack}>
                  <FiArrowLeft size={24}/>
                </button>
            </header>

            <Form>
                <Avatar>
                    <img 
                    src={avatar}
                    alt='Foto do usúario'
                    />
                <label htmlFor='avatar'>
                    <FiCamera />

                <input 
                id='avatar'
                type='file'
                onChange={handleChangeAvatar}
                // vai ir para o event do HandleChangeAvatar 1*
                />
                

                </label>
                </Avatar>


                <Input
                placeholder='Nome'
                type='text'
                icon={FiUser}  
                value={name}
                onChange= {e => setName(e.target.value)}
                />

                <Input
                placeholder='E-mail'
                type='text'
                icon={FiMail} 
                value={email}
                onChange= {e => setEmail(e.target.value)}
                />

                <Input
                placeholder='Senha Atual'
                type='password'
                icon={FiLock}  
                onChange= {e => setPasswordOld(e.target.value)}
                />

                <Input
                placeholder='Nova senha'
                type='password'
                icon={FiLock}  
                onChange= {e => setPasswordNew(e.target.value)}
                />

                <Button title='Salvar' onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}