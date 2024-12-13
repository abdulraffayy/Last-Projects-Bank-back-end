const { Client } = require("../models/client.model.js");
const { Organization } = require("../models/organization.model.js");
const { Service } = require("../models/service.model.js");
const { Invoice } = require("../models/invoice.model.js");
const { InvoiceLineItem } = require("../models/invoiceLineItems.model.js");
const { PaymentDetails } = require("../models/paymentdetails.model.js");

const clients = [
  {
    name: "Ali Khan",
    guardian: "Hassan Khan",
    address: "House 21, G-11/3, Islamabad",
  },
  {
    name: "Sara Ahmed",
    guardian: "Nadia Ahmed",
    address: "Flat 5, Bahria Town, Karachi",
  },
  {
    name: "Umer Siddiqui",
    guardian: "Saeed Siddiqui",
    address: "Street 10, Gulberg, Lahore",
  },
];

const organizations = [
  {
    name: "PakTech Solutions",
    address: "Blue Area, Islamabad",
    terms: "Net 30",
  },
  {
    name: "Creative Pakistan",
    address: "Shahrah-e-Faisal, Karachi",
    terms: "Net 15",
  },
  {
    name: "Visionary Studio",
    address: "MM Alam Road, Lahore",
    terms: "Net 45",
  },
];

const services = [
  { name: "Software Development", fee: 8000 },
  { name: "Digital Marketing", fee: 5000 },
  { name: "UI/UX Design", fee: 7000 },
];

const paymentDetails = [
  {
    account_holder: "Ali Khan",
    bank_name: "HBL",
    account_number: "0012345678901",
    IBAN: "PK84HABB00000012345678901",
  },
  {
    account_holder: "Sara Ahmed",
    bank_name: "UBL",
    account_number: "0012345678902",
    IBAN: "PK84UNIL00000012345678902",
  },
  {
    account_holder: "Umer Siddiqui",
    bank_name: "Meezan Bank",
    account_number: "0012345678903",
    IBAN: "PK84MEZN00000012345678903",
  },
];

const invoices = [
  {
    invoice_number: "INV-001",
    date_of_issue: new Date(),
    due_date: new Date(new Date().setDate(new Date().getDate() + 30)),
    subtotal: 80000,
    total: 85000,
  },
  {
    invoice_number: "INV-002",
    date_of_issue: new Date(),
    due_date: new Date(new Date().setDate(new Date().getDate() + 15)),
    subtotal: 50000,
    total: 52000,
  },
  {
    invoice_number: "INV-003",
    date_of_issue: new Date(),
    due_date: new Date(new Date().setDate(new Date().getDate() + 45)),
    subtotal: 70000,
    total: 74000,
  },
];

const invoiceLineItems = [
  { hoursDays: 10, amount: 80000 },
  { hoursDays: 8, amount: 50000 },
  { hoursDays: 12, amount: 70000 },
];

const saveData = async () => {
  try {
    const savedClients = await Client.insertMany(clients);
    const savedOrganizations = await Organization.insertMany(organizations);
    const savedServices = await Service.insertMany(services);

    invoices.forEach((invoice, index) => {
      invoice.clientId = savedClients[index % savedClients.length]._id;
      invoice.organizationId =
        savedOrganizations[index % savedOrganizations.length]._id;
    });
    const savedInvoices = await Invoice.insertMany(invoices);

    invoiceLineItems.forEach((item, index) => {
      item.invoiceNumber = savedInvoices[index % savedInvoices.length]._id;
      item.serviceId = savedServices[index % savedServices.length]._id;
    });
    await InvoiceLineItem.insertMany(invoiceLineItems);

    paymentDetails.forEach((payment, index) => {
      payment.clientId = savedClients[index % savedClients.length]._id;
    });
    const savedPaymentDetails = await PaymentDetails.insertMany(paymentDetails);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

module.exports = saveData;
