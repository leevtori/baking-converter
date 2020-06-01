import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


function calculateConversion(number, unit) {
  const cupToTbsp = {tbsp:16}
  const tbspToGram = {gram: 15}

  const output = []
  while (output === 0) {
    if (unit === 'cup'){
      const tbsp = cupToTbsp.tbsp
      const gram = tbsp * tbspToGram.gram
      output.push({gram: 1*number, tbsp: tbsp*number, gram:  gram*number});
    }
    else if (unit === 'tbsp'){
      const cup = 1/cupToTbsp.tbsp
      const gram = tbspToGram.gram
      output.push({tbsp:1*number, cup: cup*number, gram: gram*number})
    }
    else {
      const tbsp = 1/tbspToGram.gram
      const cup = tbsp * 1/cupToTbsp.tbsp
      output.push({gram: 1*number, tbsp: tbsp*number, cup: cup*number})
    }
  }
  return output
}

class OutputConversions extends React.Component {
  render(){
    const convertNumber = this.props.convertNumber;
    const convertMeasurement = this.props.convertMeasurement;

    const output = []
    this.props.conversions.forEach((conversion) => {    
      if (conversion.unit === convertMeasurement){
        output.push(conversion);
      }
    });
    debugger;
    let cup = (output[0].cup * convertNumber);
    let gram = (output[0].gram * convertNumber);
    let tbsp = (output[0].tbsp * convertNumber);

    return(
      <div id="outputMeasurements">
        <input type='text' id='cup' value={cup || 0} readOnly></input> cup
        <input type='text' id='grams' value={gram || 0} readOnly></input> grams
        <input type='text' id='tablespoon' value={tbsp || 0} readOnly></input> tbsps
      </div>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleConvertNumberChange = this.handleConvertNumberChange.bind(this);
    this.handleConverMeasurementChange = this.handleConverMeasurementChange.bind(this);
  }

  handleConvertNumberChange(e) {
    this.props.onConvertNumberChange(e.target.value);
  }

  handleConverMeasurementChange(e) {
    this.props.onConvertMeasurementChange(e.target.value);
  }

  render(){
    return(
      <form>
        <input 
          id="inputData" 
          type='number' 
          placeholder="Enter number..."
          value={this.props.convertNumber}
          onChange={this.handleConvertNumberChange}
        />
      <select 
        name='measurements' 
        id='measurements'
        value={this.props.convertMeasurement}
        onChange={this.handleConverMeasurementChange}
        >
        <option value='gram'>grams</option>
        <option value='cup'>cup</option>
        <option value='tbsp'>tbsp</option>
      </select>
      </form>
    );
  }
}

class ConverterTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      convertNumber: '',
      convertMeasurement: 'gram' 
    };

    this.handleConvertNumberChange = this.handleConvertNumberChange.bind(this);
    this.handleConverMeasurementChange = this.handleConverMeasurementChange.bind(this);
  }

  handleConvertNumberChange(convertNumber){
    this.setState({
      convertNumber: convertNumber
    });
  }

  handleConverMeasurementChange(convertMeasurement){
    this.setState({
      convertMeasurement: convertMeasurement
    });
  }
  
  render() {
    return (
      <div>
        <h1>All Purpose Measurements</h1>
        <p>Ever need to switch in between measurements and you 
          just don't know the conversion? Well never again!</p>
        <SearchBar
        convertNumber={this.state.convertNumber}
        onConvertNumberChange={this.handleConvertNumberChange}
        convertMeasurement={this.state.convertMeasurement}
        onConvertMeasurementChange={this.handleConverMeasurementChange}/>
        <OutputConversions
        convertNumber={this.state.convertNumber}
        convertMeasurement={this.state.convertMeasurement}
        conversions ={this.props.conversions}/>
      </div>
    );
  }
}
// cup to tbsp, gram tbsp
// const CONVERSIONS = [{unit: 'cup', tbsp:16}, {unit:'tbsp', gram:15}]
const CONVERSIONS = [{unit:'cup', cup:1, gram:128, tbsp:16}, {unit:'gram', cup: 0.0078125, gram:1, tbsp:0.125}, {unit:'tbsp', cup: 0.0625, gram:15, tbsp:1}]

ReactDOM.render(
  <React.StrictMode>
   <ConverterTable conversions={CONVERSIONS}></ConverterTable>
  </React.StrictMode>,
  document.getElementById('root')
);

// <App />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();