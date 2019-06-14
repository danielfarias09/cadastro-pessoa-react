import React, { Component } from 'react';
import './App.css';
import Pessoas from './components/pessoas';
import CadastrarPessoa from './components/cadastrarPessoa';

class App extends Component {

  render() {
    return (
      <div>
        <center><h2>Cadastro de Pessoas</h2></center>
          <CadastrarPessoa />
      </div>
    );
  }
}

export default App;
