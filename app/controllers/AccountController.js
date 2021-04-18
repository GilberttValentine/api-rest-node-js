const AccountController = module.exports;
const AccountService = require('../services/AccountService');

AccountController.createAccount = async (req, res, next) => {
    const body = req.body;

    try {
        await AccountService.create(body);
        res.send({ message: 'Account created' });
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.listAccountsByCustomer = async (req, res, next) => {
    const params = req.params;
    try {
        const response = await AccountService.listAccountsByCustomer(params.id);
        res.send(response);
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.cancelAccount = async (req, res, next) => {
    const params = req.params;
    try {
        await AccountService.cancelAccount(params.customerId, params.accountId);
        res.send({ message: "The account has ben canceled" });
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.consignAmountToAccount = async (req, res, next) => {
    const params = req.params;
    const body = req.body;
    try {
        await AccountService.consignAmountToAccount(params.customerId, params.accountId, body.amount);
        res.send({ message: "The consignment was successful" });
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.wireTransfer = async (req, res, next) => {
    const params = req.params;
    const body = req.body;
    try {
        await AccountService.wireTransfer(params.customerId, params.accountId, body.destinationAccountId, body.amount);
        res.send({ message: "The wire transfer was successful" });
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}

AccountController.withdrawTheAmountFromTheAccount = async (req, res, next) => {
    const params = req.params;
    const body = req.body;
    try {
        await AccountService.withdrawTheAmountFromTheAccount(params.customerId, params.accountId, body.amount);
        res.send({ message: "The withdrawal was successful" });
    } catch (error) {
        console.log({ error });
        res.status(500).send({ error: error.message }).end();
        next(error);
    }
}