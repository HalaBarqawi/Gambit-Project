import { Customer } from '../models/customer';
import { Preference } from '../models/preferences';
import { Trans, TransAttributes } from '../models/trasns';
import { Op } from 'sequelize';
export async function addTransaction(data: TransAttributes, Id: number) {
  try {
    const customer = await Customer.findOne({
      where: { Id: Id },
    });
    const preference: any = await Preference.findOne({
      where: { customerId: Id },
    });

    if (!customer) {
      return false;
    }

    const trans = new Trans(data);
    trans.customerId = Id;
    trans.Currency = preference.Currency;
    trans.Total_price = trans.Quantity * trans.Price_per_Unit;
    trans.Total = trans.Total_price * trans.Discount + trans.Taxes;

    await trans.save();
    return trans;
  } catch (e) {
    return e;
  }
}

export async function viewTransactions(pagination: any) {
  try {
    const { page, size } = pagination;

    const TransAll = await Trans.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    if (!TransAll) {
      return false;
    } else {
      // return TransAll;
      return {
        content: TransAll.rows,
        totalPages: Math.ceil(TransAll.count / Number.parseInt(size)),
      };
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
    transaction.Total_price = data.Quantity * data.Price_per_Unit;
    transaction.Total = transaction.Total_price * data.Discount + data.Taxes;
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
export async function filterTransactions(pagination: any, query: any) {
  try {
    const quantityNumber: number = Number.parseInt(query.quentity) || 100;
    const currencyType: any = query.currency;
    const orderType: String = query.orderBy || 'Quantity';
    const orderWay: String = query.order || 'ASC';

    const { page, size } = pagination;

    const TransAll = await Trans.findAndCountAll({
      where: {
        [Op.or]: {
          Quantity: { [Op.lt]: quantityNumber },
          Currency: { [Op.eq]: currencyType },
        },
      },
      order: [[`${orderType}`, `${orderWay}`]],
      limit: size,
      offset: page * size,
    });

    if (!TransAll) {
      return false;
    } else {
      //  return TransAll;
      return {
        content: TransAll.rows,
        totalPages: Math.ceil(TransAll.count / Number.parseInt(size)),
      };
    }
  } catch (e) {
    return e;
  }
}
