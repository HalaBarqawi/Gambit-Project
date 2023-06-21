import { Customer } from '../models/customer';
import { Preference, PrefrenceAttributes } from '../models/preferences';

export async function viewPreferencs(Id: number) {
  let customer = await Customer.findOne({ where: { Id: Id } });
  if (customer) {
    const preference = await Preference.findAll({
      where: { customerId: Id },
    });

    if (!preference) {
      return [false, 'No Prefrences Found'];
    }
    return [true, preference];
  }
  return [false, 'No Customer']
}
export async function viewPreferenceById(Id: number ,Id_Customer:number) {
  let customer = await Customer.findOne({ where: { Id: Id_Customer } });
  if (customer) {
    const preference = await Preference.findOne({
      where: { Id: Id },
    });

    if (!preference) {
      return [false, 'No Prefrences Found'];
    }
    return [true, preference];
  }
  return [false, 'No Customer']
}
export async function addPreference(data: PrefrenceAttributes, Id:number) {
  console.log("in service")
  console.log(Id)
  const preference = await Preference.create(data);
  try {
    preference.customerId= Id;
    await preference.save(); 
    return [true, preference];
  } catch (e) {
    return e;
  }
}
export async function editPreferenceById(data: PrefrenceAttributes, Id: number) {
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
    return true;
  }
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
