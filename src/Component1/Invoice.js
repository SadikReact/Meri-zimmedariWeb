import React from 'react';
import jsPDF from 'jspdf';

class PdfGenerator extends React.Component {
  generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    // doc.text("Octonyan loves jsPDF", 35, 25);
    // doc.addImage("examples/images/Octonyan.jpg", "JPEG", 15, 40, 180, 180);
    doc.save('Invoice.pdf');
  };

  render() {
    return (
      <div>
        <button onClick={this.generatePDF}>Generate PDF</button>
      </div>
    );
  }
}

export default PdfGenerator;

// import { jsPDF } from "jspdf";

// const generateInvoice = () => {
//   // Create a new jsPDF instance
//   const doc = new jsPDF({
//     orientation: "portrait", // Portrait orientation
//     unit: "px", // Using pixels as units
//     format: "letter", // Standard letter size (8.5x11 inches)
//   });

//   // Set font size and style for the invoice
//   doc.setFontSize(12);

//   // Add content to the invoice
//   const invoiceContent = `
//     Invoice
//     ---------------------------------------------
//     Customer Name: John Doe
//     Invoice Date: ${new Date().toLocaleDateString()}
//     Amount: $100.00
//     ---------------------------------------------
//     Thank you for your business!
//   `;

//   // Add the content to the document
//   doc.text(invoiceContent, 50, 50); // Adjust position as needed

//   // Save or display the PDF
//   doc.save("invoice.pdf");
// };

// // Call the function to generate the invoice
// generateInvoice();
