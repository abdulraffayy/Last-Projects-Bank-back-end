const express = require("express");
const connectDb = require("./db/index.js")();

const cors = require("cors");
const app = express();
//models
const { Client } = require("./models/client.model");
const { Service } = require("./models/service.model");
const { Invoice } = require("./models/invoice.model");
const { PaymentDetails } = require("./models/paymentdetails.model");
const { Organization } = require("./models/organization.model");
const { InvoiceLineItem } = require("./models/invoiceLineItems.model");

//routes
const clientRoutes = require("./routes/client.routes");
const serviceRoutes = require("./routes/service.routes");
const invoiceRoutes = require("./routes/invoice.routes");
const paymentDetailsRoutes = require("./routes/paymentdetails.routes");
const invoiceLineItemsRouter = require("./routes/invoicelineitems.routes");


// const populateDb = require("./populateDb/index.js");
// populateDb();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use(express.json());
app.use("/api/clients", clientRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/paymentdetails", paymentDetailsRoutes);
app.use("/api/invoicelineitems", invoiceLineItemsRouter);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
