import { Customer } from '../models/customer';
import { Trans, TransAttributes } from '../models/trasns';

export async function postTrans(body: TransAttributes) {
  try {
    const customer = await Customer.findOne({
      where: { Id: body.customer_id },
    });

    if (!customer) {
      return false;
    }

    const trans = new Trans(body);
    await trans.save();
    return trans;
  } catch (e) {
    return e;
  }
}

export async function previewTrans(id: TransAttributes['Id']) {
  try {
    const TransAll = await Trans.findAll({ where: { customer_id: id } });

    if (!TransAll) {
      return false;
    } else {
      return TransAll;
    }
  } catch (e) {
    return e;
  }
}
