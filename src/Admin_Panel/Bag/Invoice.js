import React, { useState, useEffect } from 'react';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import logo from "../assets/images/SmartDiner_logo.png";
import axios from "axios";

const Invoice = props => {

  const { orderId } = props
  const [change, setChange] = useState(null)
  const [CompanyDetails, setCompanyDetails] = useState({
    companyName: '',
    invoiceDate: '',
    invoiceNumber: '',
  })
  const [CustomerDetails, setCustomerDetails] = useState({
    name: '',
    billingAddress: '',
    shippingAddress: '',
  })
  const [OrderDetails, setOrderDetails] = useState({
    totalTaxableAmount: '',
    totalTax: '',
    deliveryCharge: '',
    invoiceTotal: '',
    itemMeasureQuantity: '',
    products: []
  })
  useEffect(() => {
    axios
      .get(
        `${
        process.env.REACT_APP_BACKEND_URL
        }/after_login/order/${orderId}/get_invoice`,
        {
          headers: {
            "x-access-token": `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCompanyDetails({
          companyName: response.data.invoiceData.company.companyName,
          invoiceDate: response.data.invoiceData.company.invoiceDate,
          invoiceNumber: response.data.invoiceData.company.invoiceNumber
        })
        setCustomerDetails({
          name: response.data.invoiceData.customer.name,
          billingAddress: response.data.invoiceData.customer.billingAddress,
          shippingAddress: response.data.invoiceData.customer.shippingAddress
        })
        setOrderDetails({
          totalTaxableAmount: response.data.invoiceData.order.totalTaxableAmount,
          totalTax: response.data.invoiceData.order.totalTax,
          deliveryCharge: response.data.invoiceData.order.deliveryCharge,
          invoiceTotal: response.data.invoiceData.order.invoiceTotal,
          products: response.data.invoiceData.order.products,
          itemMeasureQuantity: response.data.invoiceData.order.itemMeasureQuantity
        })
      })
      .catch((err) => {
        console.log(err);
      });
    // born = false
  }, [change]);

  const jsPdfGenerator = () => {
    //    born = true
    setChange(change + 1)
    var doc = new jsPDF();
    var col = [
      'Item',
      'Mesurement(in kgs)',
      'Quantity',
      'Rate/Item',
      'Item Discount',
      'Order Discount',
      'Taxable Value',
      'CGST',
      'SGST',
      'TGST',
      'Total'
    ];
    var rows = [];

    doc.addImage(logo, 'PNG', 10, 0, 20, 20);

    doc.setTextColor(165, 42, 42);
    doc.setFontSize(8);
    doc.setFont('', 'bold')
    doc.text(CompanyDetails.companyName, 40, 10);
    doc.setTextColor(0, 0, 0);

    doc.setFont('', 'bold')
    doc.text('Invoice Date', 40, 15);
    doc.setFont('', 'normal')
    doc.text(CompanyDetails.invoiceDate, 60, 15);
    doc.setFont('', 'bold')
    doc.text('Invoice No', 40, 20);
    doc.setFont('', 'normal')
    doc.text(JSON.stringify(CompanyDetails.invoiceNumber), 60, 20);


    doc.setTextColor(165, 42, 42);
    doc.setFontSize(8);
    doc.setFont('', 'bold')
    doc.text('Total', 150, 10);
    doc.text(OrderDetails.invoiceTotal, 160, 10);
    doc.setFont('', 'normal')

    doc.setDrawColor(165, 42, 42);
    // doc.setLineWidth(0.5);
    doc.line(0, 35, 80, 35);
    doc.setFontSize(10);
    doc.setTextColor(165, 42, 42);
    doc.setFont('', 'bold')
    doc.text('TAX INVOICE', 80, 35);
    doc.setFont('', 'normal')
    doc.line(105, 35, 220, 35);


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont('', 'bold')
    doc.text('Customer Name', 20, 40);
    doc.setFont('', 'normal')
    doc.text(CustomerDetails.name, 25, 45);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont('', 'bold')
    doc.text('Billing Address', 70, 40);
    doc.setFont('', 'normal')
    doc.text(CustomerDetails.billingAddress, 72, 45);

    doc.setFont('', 'bold')
    doc.text('Shipping Address', 150, 40);
    doc.setFont('', 'normal')
    doc.text(CustomerDetails.shippingAddress, 152, 45);

    doc.line(0, 60, 220, 60);

    {
      OrderDetails.products.map(item => {
        var Newitem = [
          { Item: item.name, b: item.itemMeasureQuantity, Quantity: item.quantity, d: item.originalPrice, e: item.itemDiscount, f: item.orderDiscount, g: item.priceAfterDiscount, CGST: item.cgst, SGST: item.sgst, TGST: item.tgst, Total: item.total },
        ]

        Newitem.forEach(ele => {
          var temp = [
            ele.Item,
            ele.b,
            ele.Quantity,
            ele.d,
            ele.e,
            ele.f,
            ele.g,
            ele.CGST,
            ele.SGST,
            ele.TGST,
            ele.Total
          ];
          rows.push(temp);
        })
      })
    }

    doc.autoTable(col, rows, {
      //styles: { fillColor: [255, 255, 204] },
      //ColumnStyles: { Quantity: { fillColor: [165, 42, 42] } },
      headStyles: { fillColor: [165, 42, 42] },
      // headStyles: { text: [0, 0, 0] },
      showHeader: 'firstPage',
      margin: { left: 0, right: 0 },
      theme: 'striped',
      startY: 62,
      styles:
      {
        overflow: 'linebreak',
      },
    });
    var finalY = doc.lastAutoTable.finalY || 20;
    doc.setFont('', 'bold')
    doc.text('Taxable Amt :', 150, finalY + 5);
    doc.setFont('', 'normal')
    doc.text(OrderDetails.totalTaxableAmount, 170, finalY + 5);
    doc.setFont('', 'bold')
    doc.text('Total Tax :', 150, finalY + 10);
    doc.setFont('', 'normal')
    doc.text(OrderDetails.totalTax, 170, finalY + 10);
    doc.setFont('', 'bold')
    doc.text('Delivery Charge :', 150, finalY + 15);
    doc.setFont('', 'normal')
    doc.text(OrderDetails.deliveryCharge, 170, finalY + 15);
    doc.setFont('', 'bold')
    doc.text('Invoice Total :', 150, finalY + 20);
    doc.setFont('', 'normal')
    doc.text(OrderDetails.invoiceTotal, 170, finalY + 20);

    doc.page = 1;
    var totalPages = 1;
    var str = "Page " + doc.page + " of " + totalPages;
    doc.text(str, 50, doc.internal.pageSize.height - 10);
    //doc.line(0, finalY + 20, 220, finalY + 20);
    doc.page++;
    doc.save('smartdiner-Invoice.pdf');


  }
  return (
    <div>
      <button onClick={() => jsPdfGenerator()}>Invoice</button>
    </div >
  );

}

export default Invoice                                               
