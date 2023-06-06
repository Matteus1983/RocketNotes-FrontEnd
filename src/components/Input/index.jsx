import { Container } from './styles'

export function Input({icon: Icon, ...rest}){
// criando o input como div, porque vai ter como propriedade um ícone e pegar todos restante e passar para o input dentro do Container.
// vai passar todas as propriedades, se é text,email,number etc.
 return(
  <Container>
  {Icon && <Icon size={20} />}
  <input {...rest} /> 
  </Container>
 )
}
// && vai fazer que o ícone só apareça se ele existir.