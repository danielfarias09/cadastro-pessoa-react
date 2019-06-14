import React, { Component } from 'react';
import '../components/pessoas.css'

class Pessoas extends Component {

    constructor(props){
        super(props);
    }

    render (){
        return (
            <div className="cardPessoa">
                { this.props.pessoas.map((pessoa, index) => (
                    <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">{pessoa.nome}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{pessoa.email}</h6>
                    </div>
                </div>
                ))}
            </div>
        );
    }
}

export default Pessoas;