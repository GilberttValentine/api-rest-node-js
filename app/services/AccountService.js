const AccountService = module.exports;

const AccountRepository = require('../repositories/AccountRepository');
const CustomerRepository = require('../repositories/CustomerRepository');

AccountService.create = async (account) => {

    const customerFound = await CustomerRepository.findById(account.customer_id);

    if (customerFound.length === 0) {
        throw new Error("Customer does not exist");
    }

    const accountsByCustomer = await AccountRepository.listAccountByCustomer(account.customer_id);

    if (accountsByCustomer.length >= 3) {
        throw new Error('The customer has exceeded the maximum limit to create accounts (You can only create 3 accounts).');
    }

    account.opened_at = new Date();
    account.amount = 0;
    await AccountRepository.create(account);
}

AccountService.listAccountsByCustomer = async (customerId) => {
    const customerFound = await CustomerRepository.findById(customerId);

    if (customerFound.length === 0) {
        throw new Error("The customer does not exist");
    }

    return AccountRepository.listAccountByCustomer(customerId);
}

AccountService.cancelAccount = async (customerId, accountId) => {

    const customer = await CustomerRepository.findById(customerId);

    if (customer.length === 0) {
        throw new Error("The customer does not exist");
    }

    const accounts = await AccountRepository.listAccountByCustomer(customerId);

    if (accounts.length === 0) {
        throw new Error("You do not have an account created");
    }

    const account = accounts.find(account => account.id === accountId);

    if (typeof account === "undefined") {
        throw new Error("The account does not exist");
    }

    if (account.amount > 0) {
        throw new Error("The account cannot be canceled because the amount is not zero");
    }

    await AccountRepository.deleteAccount(accountId);
}

AccountService.consignAmountToAccount = async (customerId, accountId, amount) => {

    const customerFound = await CustomerRepository.findById(customerId);

    if (customerFound.length === 0) {
        throw new Error("The customer does not exist");
    }

    const accounts = await AccountRepository.listAccountByCustomer(customerId);

    if (accounts.length === 0) {
        throw new Error("You cannot consign because you do not have an account created");
    }

    let account = accounts.find(account => account.id === accountId);

    if (typeof account === "undefined") {
        throw new Error("The account does not exist");
    }

    if (amount < 0) {
        throw new Error("The amount to be consigned is not valid");
    }

    account.amount += amount;

    await AccountRepository.edit(accountId, account);
}

AccountService.wireTransfer = async (customerId, accountId, destinationAccountId, amount) => {

    const customerFound = await CustomerRepository.findById(customerId);

    if (customerFound.length === 0) {
        throw new Error("The customer does not exist");
    }

    const accounts = await AccountRepository.listAccountByCustomer(customerId);

    if (accounts.length === 0) {
        throw new Error("You cannot make bank transfers because you do not have an account created");
    }

    if(accountId === destinationAccountId) {
        throw new Error("You cannot make a bank transfer to the same account")
    }

    let account = accounts.find(account => account.id === accountId);

    if (typeof account === "undefined") {
        throw new Error("The account does not exist");
    }

    let destinationAccount = await AccountRepository.findById(destinationAccountId);

    if (destinationAccount.length === 0) {
        throw new Error("Destination account does not exist");
    }

    if (amount < 0) {
        throw new Error("The amount to be consigned is not valid");
    }

    if ((account.amount - amount) < 0) {
        throw new Error("You do not have enough balance to transfer that amount of money");
    }

    account.amount -= amount;
    destinationAccount[0].amount += amount;

    await AccountRepository.edit(destinationAccountId, destinationAccount[0]);
    await AccountRepository.edit(accountId, account);
}

AccountService.withdrawTheAmountFromTheAccount = async (customerId, accountId, amount) => {

    const customerFound = await CustomerRepository.findById(customerId);

    if (customerFound.length === 0) {
        throw new Error("The customer does not exist");
    }

    const accounts = await AccountRepository.listAccountByCustomer(customerId);

    if (accounts.length === 0) {
        throw new Error("You cannot withdraw the amount because you do not have an account created");
    }

    let account = accounts.find(account => account.id === accountId);

    if (typeof account === "undefined") {
        throw new Error("The account does not exist");
    }

    if (amount < 0) {
        throw new Error("The amount to withdraw is not valid");
    }

    if ((account.amount - amount) < 0) {
        throw new Error("You do not have enough balance to withdraw that amount of money");
    }

    account.amount -= amount;

    await AccountRepository.edit(accountId, account);
}
