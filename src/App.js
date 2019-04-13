import React, { Component } from "react";
import routes from './routes';
import Nav from './components/Nav/Nav';

// import "./App.css";
import jsPDF from "jspdf";

class App extends Component {
  render() {
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      // format: 'a5'
      format: [396, 612] //5.5in by 8.5in paper
    });
    doc.setFontSize(12)
    doc.text("Sold By", 18, 39);
    // doc.autoPrint();
    // doc.save('sample.pdf')

    return (
      <div className="App">
        {/* <iframe title="pdf" id="output" src={doc.output("dataurlstring")}></iframe> */}
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
