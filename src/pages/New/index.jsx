import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

import { api } from '../../services/api'

import { Container, Form } from './styles'

export function New(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleBack(){
        navigate(-1);
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink]);
        // usa o ...prevStar, para manter oq já tinha antes
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
        // me voltar a lista com os links menos oque eu excluir
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag])
        // pega tudo que tinha antes e despeja ali

        // (prevState => [...prevState, newTag])
        // ["react", "nodejs"] => ["react", "nodejs", "express"]
        setNewTag("")
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
        // me traz todas as tags, menos a que eu estou deletando
    }

    async function handleNewNote(){
        if(!title){
            return alert("Digite o título da nota")
        }
        if(newLink) {
            return alert("Você deixou um no link campo para adicionar, mas não clicou em adicionar. Clique  para adicionar ou  deixe o campo vazio")
        }
        if(newTag) {
            return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique  para adicionar ou  deixe o campo vazio")
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Nota criada com sucesso!");
        navigate(-1);
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText 
                            title="Voltar"
                            onClick={handleBack}
                        />
                    </header>

                    <Input 
                    placeholder= 'Titulo' 
                    onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                    placeholder= 'Oberservações'
                    onChange={e => setDescription(e.target.value)}
                    />

                    <Section title='Links úteis'>
                        {
                        links.map((link, index) => (
                        <NoteItem 
                          key={String(index)}
                          value={link}
                          onClick={() => handleRemoveLink(link)}
                          // QUANDO TEM PARAMÊTRO , USA A ARROW FUNCTION
                        />
                            ))
                        }
                        <NoteItem
                          isNew
                          placeholder="Novo link"
                          value={newLink}
                          onChange={e => setNewLink(e.target.value)}
                          onClick={handleAddLink} 
                        />
                    </Section>

                    <Section title='Marcadores'>
                        <div className='tags'>
                            {
                                tags.map((tag,index) => (
                                    <NoteItem 
                                    key={String(index)}
                                    // sempre que a gente tem componentes gerando a partir de lista, geramos uma chave
                                    value={tag}
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                  ))
                                }
                        <NoteItem 
                            isNew 
                            placeholder='Nova tag'
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                            />
                        </div>
                    </Section>

                    <Button 
                        title='Salvar'
                        onClick={handleNewNote}
                    
                    />
                </Form>
            </main>
        </Container>
    );
}