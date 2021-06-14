import React, { useState, useEffect } from 'react';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import logo from "../assets/images/SmartDiner_logo.png";
import axios from "axios";


const Invoice = props => {

  const { orderId } = props
  const [change, setChange] = useState(0)

  useEffect(() => {
    if (change != 0) {
      console.log("inside useeffect..")
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
          // deliveryCharge: response.data.invoiceData.order.deliveryCharge,
          //  itemMeasureQuantity: response.data.invoiceData.order.itemMeasureQuantity,
          var doc = new jsPDF();
          var col = [
            'Item',
            'Mesurement',
            'Quantity',
            'Rate/Item',
            'Item Discount',
            'Order Discount',
            'Taxable Value',
            'CGST',
            'SGST',
            'Total'
          ];
          var rows = [];

          doc.addImage(logo, 'PNG', 10, 5, 15, 15);

          doc.setFontSize(12);
          doc.setFont('', 'bold')
          doc.text(response.data.invoiceData.company.companyName, 40, 10);
          doc.setTextColor(0, 0, 0);

          doc.setFont('', 'bold')
          doc.setFontSize(8);
          doc.text('Invoice Date', 40, 15);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.company.invoiceDate, 60, 15);
          doc.setFont('', 'bold')
          doc.text('Invoice No', 40, 20);
          doc.setFont('', 'normal')
          doc.text(JSON.stringify(response.data.invoiceData.company.invoiceNumber), 60, 20);

          doc.setFontSize(8);
          doc.setFont('', 'bold')
          doc.text('Total', 150, 10);
          doc.text(response.data.invoiceData.order.invoiceTotal, 160, 10);
          doc.setFont('', 'normal')

          //doc.setDrawColor(165, 42, 42);
          // doc.setLineWidth(0.5);
          doc.line(0, 35, 80, 35);
          doc.setFontSize(10);
          doc.setFont('', 'bold')
          doc.text('TAX INVOICE', 80, 35);
          doc.setFont('', 'normal')
          doc.line(105, 35, 220, 35);


          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.setFont('', 'bold')
          doc.text('Customer Name', 20, 40);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.customer.name, 25, 45);

          doc.setTextColor(0, 0, 0);
          doc.setFontSize(8);
          doc.setFont('', 'bold')
          doc.text('Billing Address', 70, 40);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.customer.billingAddress, 72, 45);

          doc.setFont('', 'bold')
          doc.text('Shipping Address', 150, 40);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.customer.shippingAddress, 152, 45);

          doc.line(0, 60, 220, 60);

          {
            response.data.invoiceData.order.products.map(item => {
              var Newitem = [
                {
                  name: item.name,
                  itemMeasureQuantity: item.itemMeasureQuantity,
                  quantity: item.quantity,
                  originalPrice: item.originalPrice,
                  itemDiscount: item.itemDiscount,
                  orderDiscount: item.orderDiscount,
                  priceAfterDiscount: item.priceAfterDiscount,
                  cgst: item.cgst,
                  sgst: item.sgst,
                  total: item.total
                },
              ]

              Newitem.forEach(ele => {
                var temp = [
                  ele.name,
                  ele.itemMeasureQuantity,
                  ele.quantity,
                  ele.originalPrice,
                  ele.itemDiscount,
                  ele.orderDiscount,
                  ele.priceAfterDiscount,
                  ele.cgst,
                  ele.sgst,
                  ele.total
                ];
                rows.push(temp);
              })
            })
          }

          doc.autoTable(col, rows, {

            headStyles: { fillColor: [250, 250, 210], fontStyle: "bolditalic", fontSize: 8 },
            columnStyles: { 0: { cellWidth: 50, halign: "left" } },
            willDrawCell: function (data) {
              var rows = data.table.body;
              if (data.row.index === rows.length - 1) {
                doc.setFillColor(250, 250, 210);
              }
            },
            // didParseCell: function (cell, data) {
            //   console.log("Data = ", data)
            //   console.log("cell = ", cell)
            //   var tdElement;
            //   tdElement = cell.row.raw.backgroundColor
            //   console.log("tdElement = ", tdElement)
            //   if (tdElement == false && cell.column.raw.dataKey == "datatypeVerified") {
            //     cell.cell.styles.fontStyle = 'bold';
            //     cell.cell.styles.textColor = [165, 42, 42]
            //   }
            // },
            showHeader: 'firstPage',
            margin: { left: 5, right: 5 },
            theme: 'striped',
            startY: 62,
            styles:
            {
              overflow: 'linebreak',
              halign: "center",
              fontSize: 8,
              textColor: [0, 0, 0],
              fontStyle: "normal",
              minCellHeight: 10
            },
          });

          var finalY = doc.lastAutoTable.finalY || 20;
          doc.setFont('', 'bold')
          doc.text('Taxable Amt :', 150, finalY + 5);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.order.totalTaxableAmount, 170, finalY + 5);
          doc.setFont('', 'bold')
          doc.text('Total Tax :', 150, finalY + 10);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.order.totalTax, 170, finalY + 10);
          doc.setFont('', 'bold')
          doc.text('Invoice Total :', 150, finalY + 15);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.order.invoiceTotal, 170, finalY + 15);
          doc.setFont('', 'bold')
          doc.text('Total Amount (in words) :', 105, finalY + 20);
          doc.setFont('', 'normal')
          doc.text(response.data.invoiceData.order.invoiceTotalInWords, 140, finalY + 20);


          doc.page = 1;
          var totalPages = 1;
          var str = "Page " + doc.page + " of " + totalPages;
          doc.text(str, 50, doc.internal.pageSize.height - 10);
          //doc.line(0, finalY + 20, 220, finalY + 20);
          doc.page++;

          doc.save('smartdiner-Invoice.pdf');

        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      console.log("Inside else..")
    }
  }, [change])
  return (
    <div className="invoice-btn">
      <button
        // style={{ backgroundColor: "#08a860" }  }
        onClick={() => setChange(change + 1)}>
        Download Invoice
        </button>
    </div >
  );
}

export default Invoice
