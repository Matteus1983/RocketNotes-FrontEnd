import { Container } from './styles'
import { Tag } from '../Tag'

export function Note({ data, ...rest}){
/* dentro do data vai ter data.title, título da nota em si.
data.tags
*/
 return(
  <Container {...rest}>

   <h1>{data.title}</h1>

   {
    data.tags &&
// se existir tags elas vai aparecer
    <footer>
     {
       data.tags.map(tag => <Tag key={tag.id} title={tag.name}/>)
    }
    </footer>
    }
 </Container>

 );
}