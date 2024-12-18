const fs = require('fs');
const PDFDocument = require('pdfkit');

// Create a new PDF document
const doc = new PDFDocument({ size: 'A4', margin: 50 });

// Write PDF to file
doc.pipe(fs.createWriteStream('Output.pdf'));

// --- Title: "Invoices" ---
doc
  .font('Helvetica-Bold')
  .fillColor('black')
  .fontSize(30)
  .text('Invoices', 50, 50);

// --- Rectangle with "Bank" Text ---
doc
  .fillColor('black')
  .rect(50, 100, 60, 35)
  .fill()
  .fillColor('white')
  .fontSize(20)
  .text('Bank', 55, 110);

// --- Billed To Section with BSES Logo ---
let y = 170; // Adjust the y position for "BILLED TO"
doc
  .fontSize(12)
  .fillColor('black')
  .font('Helvetica-Bold')
  .text('CLIENT INFORMATION', 50, y);


doc
.font('Helvetica')
.fontSize(11)
.text('Name: John Doe', 50, y + 15)
.text('Company: ABC Tech Ltd.', 50, y + 30)
.text('Contact: johndoe@example.com', 50, y + 45)
.text('Phone: +92 300 1234567', 50, y + 60);

// --- Place BSES Logo Image on the Right Side ---
try {
  doc.image('../assets/bsesPhotos.png', 350, y, { width: 150 }); // Adjust image position and size
} catch (error) {
  console.error('Logo image not found, skipping logo section.');
}

// --- Services Summary Below Billed To Section ---
y += 100; // Move the "Services Summary" section down after "BILLED TO"
doc
  .fontSize(14)
  .fillColor('black')
  .text('Services Summary', 50, y);

// Table Headers
doc
  .font('Helvetica-Bold')
  .fillColor('blue')
  .text('Description', 50, y + 30)
  .text('Fee', 220, y + 30)
  .text('HRS./DAYS', 320, y + 30)
  .text('Amount', 450, y + 30);

// Line below headers
doc
  .moveTo(50, y + 50)
  .lineTo(550, y + 50)
  .lineWidth(1)
  .strokeColor('black')
  .stroke();

// --- Add Table Data ---
const tableData = [
  { description: 'Service A', fee: 500, hours: 10, amount: 5000 },
  { description: 'Service B', fee: 300, hours: 5, amount: 1500 },
  { description: 'Service C', fee: 800, hours: 8, amount: 6400 },
];

let subtotal = 0;
let tableY = y + 60; // Start from below the table header

// Table Rows
doc.font('Helvetica').fontSize(12).fillColor('black');
tableData.forEach((row) => {
  doc.text(row.description, 50, tableY)
     .text(row.fee.toString(), 220, tableY)
     .text(row.hours.toString(), 320, tableY)
     .text(row.amount.toString(), 450, tableY);
  subtotal += row.amount;
  tableY += 20; // Move to the next row
});

// Line below data
doc
  .moveTo(50, tableY + 10)
  .lineTo(550, tableY + 10)
  .stroke();

// --- Subtotal and Total Below the Table ---
y = tableY + 30; // Position for totals after the table

// Left Side for Subtotal and Total
doc
  .font('Helvetica-Bold')
  .fillColor('black')
  .text('Subtotal:', 50, y)
  .text('Total:', 50, y + 20);

// Right Side (Aligned Values)
doc
  .font('Helvetica')
  .text(subtotal.toFixed(2), 450, y, { align: 'right', width: 100 })
  .fillColor('blue')
  .fontSize(14)
  .text(subtotal.toFixed(2), 450, y + 20, { align: 'right', width: 100 });

// --- Payment Details ---
y += 40;
doc
  .fontSize(12)
  .fillColor('blue')
  .text('Payment Details', 50, y);

doc
  .font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .text('AC Holder: Umer Siddiqui', 50, y + 15)
  .text('Bank Name: Meezan Bank', 50, y + 30)
  .text('Account No: 012345678903', 50, y + 45)
  .text('IBAN: PK84MEZN00000012345678903', 50, y + 60);

// --- Client Information (Left Side) ---
y += 100; // Move down for client info
doc
  .font('Helvetica-Bold')
  .fillColor('black')
  .text('BILLED TO', 50, y);


doc
  .font('Helvetica')
  .fontSize(11)
  .text('Umer Siddiqui', 50, y + 15)
  .text('Parent/Guardian', 50, y + 30)
  .font('Helvetica-Bold')
  .text('Saeed Siddiqui', 50, y + 45)
  .font('Helvetica')
  .text('Street 10, Gulberg, Lahore', 50, y + 60);

// --- Client Image (Right Side) --- (Optional: Only if image exists)
try {
  doc.image('../assets/clientImage.png', 350, y + 15, { width: 150 });
} catch (error) {
  console.error('Client image not found, skipping image section.');
}

// --- Terms and Conditions ---
doc
  .moveDown()
  .fontSize(12)
  .fillColor('blue')
  .text('Terms and Conditions', 50, y + 120);

doc
  .font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .text(
    'Kindly be aware that all fees paid for our products/services are non-refundable. This policy applies to all transactions.',
    50,
    y + 140,
    { align: 'left', width: 500 }
  );

// --- Penalty ---
doc
  .moveDown()
  .fontSize(12)
  .fillColor('blue')
  .text('Penalty', 50, y + 180);

doc
  .font('Helvetica')
  .fillColor('black')
  .fontSize(10)
  .text(
    'A penalty of 1000/- applies from the 7th day, escalating daily until the outstanding amount is settled.',
    50,
    y + 200,
    { align: 'left', width: 500 }
  );

// Finalize the PDF
doc.end();
console.log('PDF Created Successfully!');


