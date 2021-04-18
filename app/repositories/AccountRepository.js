const AccountRepository = module.exports
const DB = require('../config/database')

AccountRepository.create = (account) => {
    return DB('accounts').insert(account);
}

AccountRepository.findById = (accountId) => {
    return DB('accounts').where({ id: accountId }).select('*');
}

AccountRepository.listAccountByCustomer = (customerId) => {
    return DB('accounts').where({ customer_id: customerId }).select('*');
}

AccountRepository.edit = (accountId, account) => {
    return DB('accounts').where({ id: accountId }).update(account);
}

AccountRepository.deleteAccount = (accountId) => {
    return DB('accounts').where({ id: accountId }).del();
}
