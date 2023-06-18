import { Request, Response } from 'express';
import {
  AddNotService,
  DeleteNotService,
  EditNotService,
  ViewNotSevice,
} from '../service/notification';

export async function view_Notification(req: Request & any, res: Response) {
  let Result: any = await ViewNotSevice(req.params.id);

  if (!Result[0]) {
    return res.status(404).send({ msg: Result[1] });
  }
  return res
    .status(200)
    .send({ msg: 'Notification setting is exist', content: Result[1] });
}

export async function Add_Notification(req: Request & any, res: Response) {
  const body = req.body;
  const notfication: any = await AddNotService(body, req.params.id);
  if (notfication[0]) {
    return res
      .status(200)
      .send({ msg: 'Preferences  found!', content: notfication[1] });
  }
  return res
    .send({ msg: 'there is a Problem!'});
}

export async function Edit_Notification(req: Request & any, res: Response) {
  const id = req.params.id;
  const id_notification = req.params.id_notification;
  const body = req.body;
  let notfication: any = await EditNotService(body, id, id_notification);
  if (notfication) {
    res.status(200).send({ msg: 'success', content: notfication });
  } else {
    res.send({ msg: 'not exist ' });
  }
}

export async function delete_Notification(req: Request & any, res: Response) {
  try {
    const notfication: any = await DeleteNotService(
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
