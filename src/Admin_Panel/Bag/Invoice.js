import React, { Component } from 'react';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import logo from "../assets/images/SmartDiner_logo.png";

class Invoice extends Component {

  constructor(props) {
    super(props)
    this.state = {
      total: this.props.total,
    }
  }
  jsPdfGenerator = () => {
    var doc = new jsPDF();
    var col = [
      'Item',
      'Hsn/quantity SAC',
      'Rate/Item',
      'Discount',
      'Taxable value',
      'CGST',
      'SGST/UTGST',
      'CESS',
      'Total'
    ];
    var rows = [];

    doc.addImage(logo, 'PNG', 10, 0, 20, 20);

    doc.setTextColor(165, 42, 42);
    doc.setFontSize(8);
    doc.text('Smart Diner', 40, 10);
    doc.setTextColor(0, 0, 0);
    doc.text('GSTIN', 40, 15);
    doc.text('3QR45643VCFD', 50, 15);
    doc.text('State', 40, 20);
    doc.text('TamilNadu(12)', 50, 20);
    doc.text('PAN', 40, 25);
    doc.text('87FJFJF76', 50, 25);

    doc.setTextColor(165, 42, 42);
    doc.setFontSize(8);
    doc.text('Total', 150, 10);
    doc.text('Rs.4,970.00', 165, 10);
    doc.setTextColor(0, 0, 0);

    doc.text('Invoice Date', 150, 15);
    doc.text('13/05/21', 175, 15);
    doc.text('Invoice No.', 150, 20);
    doc.text('1FDFGD', 175, 20)
    doc.text('Reference No', 150, 25);
    doc.text('4', 175, 25)

    doc.setDrawColor(165, 42, 42);
    // doc.setLineWidth(0.5);
    doc.line(0, 35, 75, 35);
    doc.setFontSize(10);
    doc.setTextColor(165, 42, 42);
    doc.text('TAX INVOICE', 80, 35);
    doc.line(110, 35, 220, 35);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text('Customer Name', 20, 40);
    doc.text('hi', 25, 45);
    doc.text('Customer GSTIN', 20, 50);
    doc.text('35QFBBDF', 25, 55);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text('Billing Address', 70, 40);
    doc.text('fsajhsfvds', 72, 45);
    doc.text('fvfkjbkbvvblllljv', 72, 50);
    doc.text('Tamil Nadu', 72, 55);

    doc.text('Shipping Address', 150, 40);
    doc.text('fsajhsfvds', 152, 45);
    doc.text('fvfkjbkbvvblllljv', 152, 50);
    doc.text('TamilNadu', 152, 55);


    doc.line(0, 60, 220, 60);


    doc.text('Country of Supply :', 20, 65);
    doc.text('Place of Supply :', 70, 65);
    doc.text('Due Date :', 150, 65);

    doc.line(0, 70, 220, 70);



    var Newitem = [
      { Item: '1', quantitySAC: 'dvb s', Rate: 'ds', Discount: 'dcc', Taxablevalue: 'cac', CGST: 'sca', SGST: 'csaa', CESS: 'sca', Total: 'scac' },
      { Item: '2', quantitySAC: 'dsffsd', Rate: 'ds', Discount: 'dcc', Taxablevalue: 'cac', CGST: 'sca', SGST: 'csaa', CESS: 'sca', Total: 'scac' },
      { Item: '3', quantitySAC: 'dsffsd', Rate: 'ds', Discount: 'dcc', Taxablevalue: 'cac', CGST: 'sca', SGST: 'csaa', CESS: 'sca', Total: 'scac' }
    ]

    Newitem.forEach(ele => {
      var temp = [ele.Item,
      ele.quantitySAC,
      ele.Rate,
      ele.Discount,
      ele.Taxablevalue,
      ele.CGST,
      ele.SGST,
      ele.CESS,
      ele.Total];
      rows.push(temp);
    });


    doc.autoTable(col, rows, {
      //styles: { fillColor: [165, 42, 42] },
      Styles: { 0: { fillColor: [165, 42, 42] } }, // Cells in first column centered and green
      margin: { left: 0, right: 0 },
      theme: ['grid'],
      startY: 75,

    });

    doc.text('Taxable Amt :', 150, 110);
    doc.text('Total Tax :', 150, 115);
    doc.text('Invoice Total :', 150, 120);
    doc.text('Total Amt(in words) :', 150, 125);






    doc.save('smartdiner-websitefront.pdf')
  }

  render() {
    return (
      <div className="main">
        <form>
          <button onClick={this.jsPdfGenerator}>Download</button>
        </form>

      </div>
    );
  }
}



export default Invoice;
