const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {


  doc
    .image("logo.png", 40, 15, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Payment Receipt.", 250, 35, { align: "right" })
    .fontSize(10)
    .text("88 Norman Williams", 50, 80, { align: "left" })
    .text("Ikoyi, Lagos, Nigeria", 50, 95, { align: "left" })
    .text("P.O. Box 53110", 50, 110, { align: "left" })
    .text("payments@realproperties.com", 50, 125, { align: "left" })
    .text("+234(904)345-7382-23", 50, 140, { align: "left" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Receipt Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Payment Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("House Address:", 50, customerInformationTop + 30)
    .text(
      invoice.shipping.address+
      ", " +
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
       150, customerInformationTop + 30)
    .text("Billed To:", 50, customerInformationTop + 45)
    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 150, customerInformationTop + 45)
    .font("Helvetica")
    .moveDown();

  generateHr(doc, 260);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Transaction Category",
    "Total Amount (NGN)"
  );
  generateHr(doc, invoiceTableTop + 30);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 40;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      item.purpose,
      numberWithCommas(formatTwodecimalPoints(item.monthly_cost * item.no_of_month))
    );

    generateHr(doc, position + 20);
  }
  
  const subtotalPosition = invoiceTableTop + (i + 1) * 35;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    numberWithCommas(formatTwodecimalPoints(invoice.subtotal))
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "RP Charges",
    numberWithCommas(formatTwodecimalPoints(invoice.rp_charges))
  );

  const duePosition = paidToDatePosition + 20;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Total",
    numberWithCommas(formatTwodecimalPoints(invoice.subtotal + invoice.rp_charges))
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payments have been sent to the Landlord. Thank you for your patronage.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "NGN " + (cents).toFixed(2);
}

function formatTwodecimalPoints(cent) {
  return (cent).toFixed(2);
}

function formatDate(date) {
  const day = ["1st", "2nd", "3rd", "4th", "5th", "6th","7th", "8th","9th", "10th", "11th", "12th", "13th","14th", "15th", "16th", "17th", "18th", "19th",
  "20th","21st", "22nd", "23rd","24th", "25th", "26th", "27th", "28th", "29th","30th", "31st"][date.getDate() - 1];
    const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][date.getMonth()];
    const year = date.getFullYear();

  return day + " of "+ month + ", "+ year;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  createInvoice
};