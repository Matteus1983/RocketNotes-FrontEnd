import { Container } from "./styles";

export function Button({title, loading = false, ...rest }){
    // passar o false para o loading caso ele não seja atribuido para ninguem no index.

    return(
    <Container 
    type="button"
    disabled={loading}
    {...rest}
    >
        { loading ? 'Carregando...' : title }
    </Container>
    );
}