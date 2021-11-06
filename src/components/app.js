import React, { Component } from 'react';
import { saveAs } from 'file-saver';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      namefile: ""
    }
    this.createFile = this.createFile.bind(this);
    this.readFile = this.readFile.bind(this);
    this.RemoveRepeatCharapters = this.RemoveRepeatCharapters.bind(this);
    this.decodingFile = this.decodingFile.bind(this);
    
  }
  decodingFile() {
    const lines = [];
    let fileCorrupt = false ;
    //leeremos el mensaje 
    //nos aseguramos que tiene 4 lineas y los datos posibles
    //
    this.state.message.split('\r\n').map((i) => {
      lines.push(String(i));
    });
    
    if(lines.length == 4) {
      const line1 = [];
      lines[0].split(' ').map((number) => {
        line1.push(parseInt(number));
      })
      if(line1.length == 3) {
        if (line1[0] >= 2 && line1[0] <= 50 && line1[1] >= 2 && line1[1] <= 50 && line1[2] >= 3 && line1[2] <= 5000) {
          //Comprobamos que los numeros coinciden con las instrucciones
          if (line1[0]!= lines[1].length) fileCorrupt = true;
          if (line1[1]!= lines[2].length) fileCorrupt = true;
          if (line1[2]!= lines[3].length) fileCorrupt = true;
          //el fichero será correcto
        } else fileCorrupt = true;
      } else fileCorrupt = true;
    } 
    else fileCorrupt = true;
    
    if (fileCorrupt == false) {
      //se desencripta el mensaje
      const mensaje = this.RemoveRepeatCharapters(lines[3]);
      //busqueda primer mensaje
      let firstValue, secondValue;
      if (mensaje.indexOf(lines[1]) >= 0) {
        firstValue ="SI";
      } else {
        firstValue = "NO";
      }
      //busqueda segundo mensaje
      if (mensaje.indexOf(lines[2]) >= 0) {
        secondValue ="SI";
      } else {
        secondValue = "NO";
      }

      this.createFile(firstValue, secondValue);
    } 
    else alert("Fichero equivocado \r\n O estás en la pagina EQUIVOCADA!!! 0.0");
  }
  createFile(fvalue, svalue) {
      const blob = new Blob([ fvalue, "\n",svalue ], {type: 'text/plain;charset=utf-8'});
      saveAs( blob, 'respuesta.txt');
  }
  RemoveRepeatCharapters(str) {
    //funcion para borrar caracteres 
    let strUni = "";
    for (var i = 0; i < str.length; i++) {
      if(strUni.length == 0){
        strUni += str.charAt(i);
      } else {
        if (strUni.charAt(strUni.length-1) != str.charAt(i)) {
          strUni += str.charAt(i);
        }
      }
    } 
    return strUni;
  }
  readFile(e) {
    // leemos el fichero
    const file = e.target.files[0];
    if ( !file ) return;

    const nameFile = e.target.files[0].name;

    const fileReader = new FileReader();

    fileReader.readAsText( file );

    fileReader.onload = () => {
      this.setState({
        message:fileReader.result,
        namefile:nameFile
      });
    }

    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }
  render() {
    return (
      <div className='app'>
        <div className='header'>
          <i className="fas fa-user-secret icon"></i>
          <h1 className='titulo'>Inserte Mensaje</h1>
        </div>
        
        <br/>
        <div className='import'>
          <input 
            type='file'
            id='fileinput'
            className='inputfile'
            multiple={false}
            onChange={ this.readFile }
          />
          <label htmlFor='fileinput' className='labelInputFile'><i className="fas fa-file-upload"></i></label>
          <span className='nameFileSpan'>{this.state.namefile}</span>
        </div>
        
        <br/>
        <button
          className='buttonDecoding'
          onClick={ this.decodingFile }
        >
          Respuesta
        </button>
      </div>
    );
  }
}