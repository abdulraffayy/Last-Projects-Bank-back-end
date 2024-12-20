const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');

// Endpoint to generate PDF
router.get('/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  generatePDF(invoiceId);
  res.status(200).send(invoiceId);
});

async function generatePDF(invoiceID) {
  try {
    // Fetch the invoice data
    const invoiceResponse = await axios.get(`http://localhost:3003/api/invoices/${invoiceID}`);
    const invoiceData = invoiceResponse.data;

    // Fetch line items for the invoice
    const lineItemsResponse = await axios.get(`http://localhost:3003/api/invoicelineitems?invoiceId=${invoiceID}`);
    const lineItems = lineItemsResponse.data;

    // Create a new PDF document
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filePath = `Output_${invoiceID}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    // --- Title ---
    doc.font('Helvetica-Bold').fontSize(30).text('Invoice', 50, 50);

    // --- Invoice Details ---
    doc
      .font('Helvetica')
      .fontSize(12)
      .text(`Invoice Number: ${invoiceData.invoice_number}`, 50, 100)
      .text(`Date of Issue: ${new Date(invoiceData.date_of_issue).toLocaleDateString()}`, 50, 120)
      .text(`Due Date: ${new Date(invoiceData.due_date).toLocaleDateString()}`, 50, 140);

    // --- Client Information ---
    doc
      .moveDown()
      .fontSize(14)
      .text('BILLED TO')
      .fontSize(12)
      .text(`Name: ${invoiceData.clientId?.name || 'N/A'}`, 50, 170)
      .text(`Parent/Guardian: ${invoiceData.clientId?.guardian || 'N/A'}`, 50, 190)
      .text(`Address: ${invoiceData.clientId?.address || 'N/A'}`, 50, 210);

    // --- Services Summary ---
    doc.moveDown().fontSize(14).text('Services Summary', 50, 250);

    // Table Headers
    doc
      .font('Helvetica-Bold')
      .text('Description', 50, 270)
      .text('Fee', 220, 270)
      .text('HRS/DAYS', 320, 270)
      .text('Amount', 450, 270);

    // Line below headers
    doc
      .moveTo(50, 290)
      .lineTo(550, 290)
      .lineWidth(1)
      .strokeColor('black')
      .stroke();

    // --- Add Line Items ---
    let y = 310; // Starting Y position for the table rows
    let subtotal = 0;

    doc.font('Helvetica').fontSize(12);
    lineItems.forEach((item) => {
      doc.text(item.serviceId?.name || 'N/A', 50, y)
        .text(item.serviceId?.fee?.toString() || '0', 220, y)
        .text(item.hoursDays?.toString() || '0', 320, y)
        .text(item.amount?.toString() || '0', 450, y);
      subtotal += item.amount || 0;
      y += 20; // Move to the next row
    });

    // Line below data
    doc
      .moveTo(50, y + 10)
      .lineTo(550, y + 10)
      .stroke();

    // --- Totals ---
    y += 30; // Adjust position for totals
    doc
      .font('Helvetica-Bold')
      .text('Subtotal:', 50, y)
      .text(subtotal.toFixed(2), 450, y, { align: 'right', width: 100 });

    // Finalize the PDF
    doc.end();

    console.log(`PDF Created Successfully: ${filePath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}


module.exports = router;