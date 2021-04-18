const CustomerRepository = module.exports;

const DB = require('../config/database');

CustomerRepository.create = (customer) => {
    return DB('customers').insert(customer);
}

CustomerRepository.findById = (identificationCard) => {
    return DB('customers').where({ id: identificationCard }).select('*');
}

CustomerRepository.edit = (identificationCard, customer) => {
    return DB('customers').where({ id: identificationCard }).update(customer);
}

CustomerRepository.delete = (identificationCard) => {
    return DB('customers').where({ id: identificationCard }).del();
}
