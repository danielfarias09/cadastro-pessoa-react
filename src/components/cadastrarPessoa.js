import React, { Component } from 'react';
import '../components/cadastrarPessoa.css'
import Pessoa from './pessoa';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CadastrarPessoa extends Component {

    constructor(props){
        super(props);
        this.state = {
            nome: '',
            cpf: '',
            email: '',
            dataNascimento: '',
            ddd: '',
            numero: '',
            pessoas: [],
            telefones: []
        }
    }

    handleNomeChange = (event) => {
        this.setState({ nome: event.target.value })
    }

    handleCpfChange = (event) => {
        this.setState({ cpf: event.target.value })
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    handleDtNascimentoChange = (event) => {
        this.setState({ dataNascimento: event.target.value })
    }

    handleDddChange = (event) => {
        this.setState({ ddd: event.target.value })
    }

    handleNumeroChange = (event) => {
        this.setState({ numero: event.target.value })
    }

    addTelefone = (event) => {
        var telefone = {'ddd': this.state.ddd , 'numero': this.state.numero};
        this.setState(state => {
            const telefones = [...state.telefones, telefone];          
            return {
                ddd: '',
                numero: '',
                telefones,
                telefone: {},
              };
        });
    }

    removerTelefone = (index) => {
        //O método filter() cria um novo array com todos os elementos que passam no teste implementado pela função
        this.setState({
            telefones: this.state.telefones.filter((x,i) => i != index )
          });
    }

    removerPessoa = (idPessoa, index) => {
        fetch('http://localhost:8080/pessoas/' + idPessoa, {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
       }).then((res) => res.json())
       .then((data) => {
            this.setState({
                pessoas: this.state.pessoas.filter((x,i) => i != index )
            });
       })
       .catch((err)=>console.log(err))
    }

    editarPessoa = (idPessoa) => {
        fetch('http://localhost:8080/pessoas/' + idPessoa)
        .then(res => res.json())
        .then((data => {
            this.setState({
                nome: data.nome,
                cpf: data.cpf,
                email: data.email,
                dataNascimento: new Date(data.dataNascimento),
                telefones: data.telefones
            });
        })).catch(console.log)
    }

    componentDidMount = () => {
        this.loadPessoas();
    }

    loadPessoas () {
        fetch('http://localhost:8080/pessoas')
        .then(res => res.json())
        .then((data => {
            this.setState({pessoas: data});
        })).catch(console.log)
    }

    handleSubmit = () => {
       fetch('http://localhost:8080/pessoas', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(this.state)
       }).then((res) => res.json())
       .then((data) => {
        this.setState({
            nome: '',
            cpf: '',
            email: '',
            dataNascimento: ''})
        this.loadPessoas();
       })
       .catch((err)=>console.log(err))
    }

    render() {
        return (
            <div className="row pessoaForm">
                <div className="col-md-6 border-right">
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control" value={this.state.nome} onChange={this.handleNomeChange} />
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" className="form-control" value={this.state.cpf} onChange={this.handleCpfChange} />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Data de Nascimento</label>
                            <input type="date" className="form-control" value={this.state.dataNascimento} onChange={this.handleDtNascimentoChange}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label>DDD</label>
                            <input type="text" className="form-control" value={this.state.ddd} onChange={this.handleDddChange} />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Telefone</label>
                            <input type="text" className="form-control" value={this.state.numero} onChange={this.handleNumeroChange} />
                        </div>
                        <div className="form-group col-md-3 btn-telefone">
                            <button className="btn btn-primary" onClick={this.addTelefone}>Adicionar</button>
                        </div>
                    </div>

                    <table className="table">
                        <tbody>                                                
                            { this.state.telefones.map((telefone, index) => (
                                <tr className="form-row"> 
                                    <th className="form-group col-md-7">
                                        ({telefone.ddd}) {telefone.numero} 
                                    </th>
                                    <th className="form-group col-md-1">
                                        <button className="btn btn-danger btn-sm float-right" onClick={this.removerTelefone.bind(this, index)}><FontAwesomeIcon icon={faTrash} /></button>
                                    </th>
                                </tr>
                            ))}                                           
                        </tbody>
                    </table>
                           
                    <button className="btn btn-success" onClick={this.handleSubmit}>Salvar</button>
                </div>

                <div className="col-md-6">
                    <React.Fragment>
                        <table className="table table-hover table-pessoa">
                            <tbody>
                                { this.state.pessoas.map((pessoa, index) => (
                                    <Pessoa key={pessoa.id} pessoa={pessoa} removerPessoa={this.removerPessoa} editarPessoa={this.editarPessoa} id={pessoa.id} index={index} />            
                                ))}
                            </tbody>
                        </table>
                    </React.Fragment>               
                </div>
            </div>
        );
    }

}

export default CadastrarPessoa;