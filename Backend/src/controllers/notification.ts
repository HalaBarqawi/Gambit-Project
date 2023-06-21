import { Request, Response } from 'express';
import {
  addNotification,
  deleteNotificationById,
  editNotificationById,
  viewNotification,
} from '../service/notification';

export async function getNotification(req: Request & any, res: Response) {
  let Result: any = await viewNotification(req.params.id);

  if (!Result[0]) {
    return res.status(404).send({ msg: Result[1] });
  }
  return res
    .status(200)
    .send({ msg: 'Notification setting is exist', content: Result[1] });
}

export async function postNotification(req: Request & any, res: Response) {
  const body = req.body;
  const notfication: any = await addNotification(body, req.params.id);
  if (notfication[0]) {
    return res
      .status(200)
      .send({ msg: 'Preferences  found!', content: notfication[1] });
  }
  return res.send({ msg: 'there is a Problem!' });
}

export async function editNotification(req: Request & any, res: Response) {
  const id = req.params.id;
  const id_notification = req.params.id_notification;
  const body = req.body;
  let notfication: any = await editNotificationById(body, id, id_notification);
  if (notfication) {
    res.status(200).send({ msg: 'success', content: notfication });
  } else {
    res.send({ msg: 'not exist ' });
  }
}

export async function deleteNotification(req: Request & any, res: Response) {
  try {
    const notfication: any = await deleteNotificationById(
      req.params.id,
      req.params.id_notification
    );
    if (!notfication) {
      return res.status(404).send('Failed');
    }
    res.status(200).send('Done Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
