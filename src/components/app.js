import React, { Component } from 'react';
import { saveAs } from 'file-saver';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      myValue: "resultado primer valor",
      myValue2: "resultado segundo valor"
    }
    this.createFile = this.createFile.bind(this);
    this.readFile = this.readFile.bind(this);
  }
  createFile() {
    const blob = new Blob([ this.state.myValue, "\n",this.state.myValue2 ], {type: 'text/plain;charset=utf-8'});
    saveAs( blob, 'respuesta.txt');
  }
  readFile(e) {
    const file = e.target.files[0];
    if ( !file ) return;

    const fileReader = new FileReader();

    fileReader.readAsText( file );

    fileReader.onload = () => {
      console.log(fileReader.result);
      this.setState({
        message:fileReader.result
      });
    }

    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }
  render() {
    return (
      <div className='app'>
        <h1>Inserte Mensaje</h1>
        <br/>
        <input 
          type="file" 
          multiple={false}
          onChange={ this.readFile }
        />
        <br/>
        <button
          onClick={ this.createFile }
        >
          Respuesta
        </button>
      </div>
    );
  }
}