import { Container, Links, Content } from './style'
import { useParams, useNavigate } from 'react-router-dom'
// buscar os parametros que existem na rota
import { useState, useEffect} from 'react'

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { Tag } from '../../components/Tag'

export function Details(){
  const [ data, setData ] = useState(null);
  // null para dizer que vai começar sem conteúdo 

  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1);
      // fazer uma requisição para a api para deletar a nota, passando como parâmetro o id do usuário
      // função async porque demora um tempo para essa requisição acontecer, então com o await o programa não vai travar 
    }
  }
  
  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
      // data para colocar os detalhes da nota
    }
    fetchNote();
    // chama a função aqui para ela ser executada
  }, [])

  return(
    <Container>
      <Header/>
    {
      data &&
      // IF , Se tiver o data mostra o conteúdo
      <main>
        <Content>

      <ButtonText 
        title='Excluir nota'
        onClick={handleRemove}
      />
      
      <h1>{data.title}</h1>

      <p>
        {data.description}
      </p>

      {
        data.links &&
        // SÓ RENDERIZA ESSA SEÇÃO SE TIVER LINKS PARA RENDERIZAR
      <Section title='Links úteis'>
        <Links>
        {
          data.links.map(link => (
            <li key={String(link.id)}>
              <a href={link.url} target='_blank'>
                {link.url}
              </a>
            </li>
            // key porque é um array, e cada link vem do links, e data vem da Api
          ))
        }
        </Links>
      </Section>
      }

      {
        data.tags &&
      // só renderizo se tiver tags
      <Section title='Marcadores'>
        {
          data.tags.map(tag => (
            <Tag 
              key={String(tag.id)}
              title={tag.name}
            />
          ))
        }
      </Section>
      }

      <Button 
      title="Voltar" 
      onClick={handleBack}
      />
      </Content>
      </main>
    }
    </Container>
  )
}