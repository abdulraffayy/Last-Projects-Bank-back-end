const Joi = require("joi");

// Client Schema
const clientSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  guardian: Joi.string().min(3).max(50).required(),
  address: Joi.string().max(255).required(),
});

// Service Schema
const serviceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  fee: Joi.number().min(0).required(),
});

// Invoice Schema
const invoiceSchema = Joi.object({
  date_of_issue: Joi.date().required(),
  due_date: Joi.date().greater(Joi.ref("date_of_issue")).required(),
  clientId: Joi.string().required(),
  organizationId: Joi.string().required(),
  subtotal: Joi.number().min(0).required(),
  total: Joi.number().min(Joi.ref("subtotal")).required(),
  lineItems: Joi.array()
    .items(
      Joi.object({
        serviceId: Joi.string().required(),
        hoursDays: Joi.number().min(0).required(),
        amount: Joi.number().min(0).required(),
      })
    )
    .required(),
});

// Payment Details Schema
const paymentDetailsSchema = Joi.object({
  account_holder: Joi.string().min(3).max(50).required(),
  bank_name: Joi.string().min(3).max(50).required(),
  account_number: Joi.string().length(14).required(),
  IBAN: Joi.string()
    .regex(/^PK[0-9]{2}[A-Z]{4}[0-9]{16}$/)
    .required(),
});

const organizationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  address: Joi.string().max(255).required(),
  terms: Joi.string().valid("Net 15", "Net 30", "Net 45").required(),
});

const invoiceLineItemSchema = Joi.object({
    invoiceNumber: Joi.string().required(),
    serviceId: Joi.string().required(),
    hoursDays: Joi.number().required(),
    amount: Joi.number().required(),
  });

module.exports = {
  clientSchema,
  serviceSchema,
  invoiceSchema,
  paymentDetailsSchema,
  organizationSchema,
  invoiceLineItemSchema,
};
