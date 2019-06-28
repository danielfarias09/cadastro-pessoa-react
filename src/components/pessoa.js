import React, { Component } from 'react';
import '../components/pessoa.css';
import ReactDOM from 'react-dom';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Pessoa extends Component {
    state = { 
        showModal: false
    };

    constructor(props){
        super(props);
    }
    
    showModal = () => {
        this.setState({ showModal: true });
    };

    hideModal = () => {
        this.setState({ showModal: false});
    };

    render (){
        const SHOW  = this.state.showModal ? "modal d-block" : "modal d-none";
        const MODAL = (
            <div className={SHOW} tabIndex="-1" role="dialog" 
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.pessoa.nome}</h4>
                            <button type="button" className="close" data-dismiss="modal-dialog" onClick={this.hideModal}>&times;</button>
                        </div>                  
                        <div className="modal-body">
                            <b>E-MAIL: </b> {this.props.pessoa.email} <br/>
                            <b>CPF: </b> {this.props.pessoa.cpf} <br/>
                            <b>IDADE: </b> {this.props.pessoa.idade} <br/>
                        </div>
                    </div>                      
                </div>
            </div>
        );
           return (  
                <tr className="row">
                    <td className="col-md-10" onClick={this.showModal}>{this.props.pessoa.nome}</td>
                    <td className="col-md-1 float-left"><button type="button" className="btn btn-primary btn-sm" onClick={this.props.editarPessoa.bind(this,this.props.id)}><FontAwesomeIcon icon={faUserEdit} /></button></td>
                    <td className="col-md-1 float-left"><button type="button" className="btn btn-danger btn-sm" onClick={this.props.removerPessoa.bind(this,this.props.id, this.props.index)}><FontAwesomeIcon icon={faTrash} /></button></td>
                    {this.state.showModal &&  ReactDOM.createPortal(MODAL, document.getElementById("modal-root")) }
                </tr>                                     

        );
    }
}

export default Pessoa;