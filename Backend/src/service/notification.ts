import { NotificationNotFoundException } from '../exceptions/notFoundNotification';
import { PreferenceNotFoundException } from '../exceptions/notFoundPreference';
import { NotificationAttributes, Notification } from '../models/notification';
import { Preference } from '../models/preferences';

export async function viewNotification(Id: number) {
  let preference = await Preference.findOne({ where: { Id: Id } });
  if (preference) {
    const notification = await Notification.findAll({
      where: { preference_Id: Id },
    });

    if (!notification) {
      throw new NotificationNotFoundException();
    }
    return notification;
  }
  throw new PreferenceNotFoundException();
}
export async function addNotification(data: any, Id_preferences: number) {
  const notification = await Notification.create(data);
  try {
    notification.preference_Id = Id_preferences;
    await notification.save();
    return notification;
  } catch (e) {
    return e;
  }
}
export async function editNotificationById(
  data: NotificationAttributes,
  Id: number,
  id_notification: number
) {
  let preference = await Preference.findOne({ where: { Id: Id } });
  if (preference) {
    let notification = await Notification.findOne({
      where: { Id: id_notification, preference_Id: Id },
    });
    if (!notification) {
      throw new NotificationNotFoundException();
    }
    await Notification.update(data, {
      where: {
        Id: id_notification,
      },
    });
    return notification;
  } else {
    throw new PreferenceNotFoundException();
  }
}
export async function deleteNotificationById(
  Id: number,
  id_notification: number
) {
  const notification = await Notification.findOne({
    where: { Id: id_notification, preference_Id: Id },
  });

  if (!notification) {
    return false;
  }

  await notification.destroy();

  return true;
}
