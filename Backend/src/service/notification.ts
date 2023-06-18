import { NotificationAttributes, Notification } from '../models/notification';
import { Preference } from '../models/preferences';

export async function ViewNotSevice(Id: number) {
  let preference = await Preference.findOne({ where: { Id: Id } });
  if (preference) {
    const notification = await Notification.findAll({
      where: { preference_Id: Id },
    });

    if (!notification) {
      return [false, 'No notfication settings'];
    }
    return [true, notification];
  }
  return [false, 'No Preference'];
}
export async function AddNotService(
  data: any,
  Id_preferences: number
) {
  const notification = await Notification.create(data);
  try {
    notification.preference_Id = Id_preferences;
    await notification.save();
    return [true, notification];
  } catch (e) {
    return e;
  }
  
}
export async function EditNotService(
  data: NotificationAttributes,
  Id: number,
  id_notification: number
) {
  let preference = await Preference.findOne({ where: { Id: Id } });
  if (preference) {
    await Notification.update(data, {
      where: {
        Id: id_notification,
      },
    });
    return true;
  }
}
export async function DeleteNotService(Id: number, id_notification: number) {
  const notification = await Notification.findOne({
    where: { Id: id_notification, preference_Id: Id },
  });

  if (!notification) {
    return false;
  }

  await notification.destroy();

  return true;
}
