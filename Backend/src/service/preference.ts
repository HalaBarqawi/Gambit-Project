import { CustomerNotFoundException } from '../exceptions/notFoundCustomer';
import { PreferenceNotFoundException } from '../exceptions/notFoundPreference';
import { Customer } from '../models/customer';
import { Preference, PrefrenceAttributes } from '../models/preferences';

export async function viewPreferencs(Id: number) {
  let customer = await Customer.findOne({ where: { Id: Id } });
  if (customer) {
    const preference = await Preference.findAll({
      where: { customerId: Id },
    });

    if (!preference) {
      throw new PreferenceNotFoundException();
    }
    return preference;
  }
  throw new CustomerNotFoundException();
}
export async function viewPreferenceById(Id: number, Id_Customer: number) {
  let customer = await Customer.findOne({ where: { Id: Id_Customer } });
  if (customer) {
    const preference = await Preference.findOne({
      where: { Id: Id },
    });

    if (!preference) {
      throw new PreferenceNotFoundException();
    }
    return preference;
  }
  throw new CustomerNotFoundException();
}
export async function addPreference(data: PrefrenceAttributes, Id: number) {
  const preference = await Preference.create(data);
  try {
    preference.customerId = Id;
    await preference.save();
    return preference;
  } catch (e) {
    return e;
  }
}
export async function editPreferenceById(
  data: PrefrenceAttributes,
  Id: number
) {
  let preference = await Preference.findOne({ where: { Id: Id } });
  if (preference) {
    await Preference.update(
      {
        Language: data.Language,
        Currency: data.Currency,
      },
      {
        where: {
          Id: Id,
        },
      }
    );
    return preference;
  }
  throw new PreferenceNotFoundException();
}
export async function deletePreferenceById(Id: number) {
  const preference = await Preference.findOne({
    where: { Id: Id },
  });

  if (!preference) {
    return false;
  }
  await preference.destroy();
  return true;
}
