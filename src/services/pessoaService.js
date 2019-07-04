const BASE_URL = 'http://localhost:8080/pessoas/';

export const getPessoas = async () => {
    const response = await fetch(BASE_URL); // await faz com que seja retornada uma promise
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const deletePessoa = async (idPessoa) => {
    const response = await fetch(BASE_URL + idPessoa, {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
       });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const getPessoa = async (idPessoa) => {
    const response = await fetch(BASE_URL + idPessoa);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const savePessoa = async (pessoa) => {
    let response;
    if(pessoa.id){
        response = await fetch(BASE_URL + pessoa.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa)
        });
    }else{
        response = await fetch(BASE_URL,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa)
        });
    }
    
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}

export const updatePessoa = async (pessoa) => {
    const response = await fetch(BASE_URL + pessoa.id, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(pessoa)
       });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
}