const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const AccountController = require('../controllers/AccountController');

const router = express.Router();

router.post('/customers', CustomerController.create);
router.get('/customers/:id', CustomerController.find);
router.put('/customers/:id', CustomerController.edit);
router.delete('/customers/:id', CustomerController.delete);

router.post('/accounts', AccountController.createAccount);
router.get('/customers/:id/accounts', AccountController.listAccountsByCustomer);
router.put('/customers/:customerId/accounts/:accountId/to-deposit', AccountController.consignAmountToAccount);
router.put('/customers/:customerId/accounts/:accountId/transfer', AccountController.wireTransfer);
router.put('/customers/:customerId/accounts/:accountId/withdraw', AccountController.withdrawTheAmountFromTheAccount);
router.delete('/customers/:customerId/accounts/:accountId', AccountController.cancelAccount);

module.exports = router;
