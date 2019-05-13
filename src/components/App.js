import React, { Component } from "react";
import "../css/App.css";
import Header from "./Header";
import Formulario from './Formulario';
import Listado from './Listado';
import ControlPresupuesto from './ControlPresupuesto';
import {validarPresupuesto} from '../helper';


class App extends Component {

  state = {
    presupuesto : '',
    restante: '',
    gastos: {}
  }

  componentDidMount(){
    this.obtenerPresupuesto()
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('Cual es el presupuesto?')
    console.log(presupuesto)

    let resultado = validarPresupuesto(presupuesto);
    if(resultado) {
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto
      })
    } else {
      this.obtenerPresupuesto();
    }
  }


  //agregarGasto al state
  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = {...this.state.gastos};

    // console.log('Se agrego el gasto' + gasto);
    // console.log(gastos);

    //agregar al gasto al state
    gastos[`gasto${Date.now()}`] = gasto;

    this.restarPresupuesto(gasto.cantidadGasto);

     //ponerlo en el state
    this.setState({
      gastos
    })
   
   
  }

  //Restar del presupuesto cuando se crea gasto
  restarPresupuesto = cantidad => {
    //leer el gasto
    let restar = Number(cantidad);

    //Tomar una copia del state actual
    let restante = this.state.restante;

    //lo restamos
    restante -= restar;

    console.log(restante);
    
    //agregamos el nuevo state
    this.setState({
      restante
    })
  
  }


  render() {
    return (
      <div className="App container">
        <Header titulo="Gasto Semanal" />

        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column"> 
             <Formulario 
             agregarGasto={this.agregarGasto}/>
            </div>
            <div className="one-half column"> 
              <Listado gastos={this.state.gastos} />
              <ControlPresupuesto
              presupuesto={this.state.presupuesto}
              restante={this.state.restante}
               />
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
