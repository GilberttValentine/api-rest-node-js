const CustomerService = module.exports;
const CustomerRepository = require('../repositories/CustomerRepository');
const AccountRepository = require('../repositories/AccountRepository');

CustomerService.create = async (customer) => {
    const customerFound = await CustomerRepository.findById(customer.id);

    if (customerFound.length > 0) {
        throw new Error('The customer already exists');
    }

    await CustomerRepository.create(customer);
}

CustomerService.findCustomer = async (customerId) => {
    const customers = await CustomerRepository.findById(customerId);

    if (customers.length === 0) return undefined;

    return customers[0];
}

CustomerService.edit = async (id, customer) => {
    const customerFound = await CustomerRepository.findById(id);

    if (customerFound.length === 0) {
        throw new Error("The customer doesn't exist");
    }

    await CustomerRepository.edit(id, customer);
}

CustomerService.delete = async (idCustomer) => {

    const customerFound = await CustomerRepository.findById(idCustomer);

    if (customerFound.length === 0) {
        throw new Error("The client does not exist");
    }

    const customerAccounts = await AccountRepository.listAccountByCustomer(idCustomer);

    if (customerAccounts.length > 0) {
        throw new Error("The client has accounts, therefore it cannot be deleted");
    }

    await CustomerRepository.delete(idCustomer);
}
