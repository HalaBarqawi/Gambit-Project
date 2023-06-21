import { Customer } from '../models/customer';
import { Preference } from '../models/preferences';
import { Trans, TransAttributes } from '../models/trasns';

export async function addTransaction(data: TransAttributes, Id: number) {
  try {
    const customer = await Customer.findOne({
      where: { Id: Id },
    });
    const preference:any= await Preference.findOne({where: {Id:Id}})

    if (!customer) {
      return false;
    }

    const trans = new Trans(data);
    trans.customerId = Id;
    trans.Currency=preference.Currency;
    trans.Total_price=trans.Quantity*trans.Price_per_Unit;
    trans.Total=(trans.Total_price*trans.Discount)+trans.Taxes;

    await trans.save();
    return trans;
  } catch (e) {
    return e;
  }
}

export async function viewTransactions() {
  try {
    const TransAll = await Trans.findAll();

    if (!TransAll) {
      return false;
    } else {
      return TransAll;
    }
  } catch (e) {
    return e;
  }
}

export async function viewTransactionByCustomerId(id: number) {
  try {
    const trans = await Trans.findAll({ where: { customerId: id } });

    if (!trans) {
      return false;
    } else {
      return trans;
    }
  } catch (e) {
    return e;
  }
}

export async function viewTransactionById(id: number, customerId: number) {
  try {
    const trans = await Trans.findAll({
      where: { Id: id, customerId: customerId },
    });

    if (!trans) {
      return false;
    } else {
      return trans;
    }
  } catch (e) {
    return e;
  }
}

export async function editTransactionById(data: TransAttributes, Id: number) {
  let transaction = await Trans.findOne({ where: { Id: Id } });
  if (transaction) {
    transaction.Total_price=data.Quantity*data.Price_per_Unit;
    transaction.Total=(transaction.Total_price*data.Discount)+data.Taxes;
    await transaction.update(data);
    return true;
  }
}
export async function deleteTransactionById(Id: number) {
  const trans = await Trans.findOne({
    where: { Id: Id },
  });
  if (!trans) {
    return false;
  }
  await trans.destroy();

  return true;
}
