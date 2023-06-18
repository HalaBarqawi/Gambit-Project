import { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { Preference } from '../models/preferences';
import {
  AddService,
  DeleteService,
  EditService,
  ViewService,
} from '../service/preference';

export async function view_Pref(req: Request & any, res: Response) {
  let Result: any = await ViewService(req.user.Id);

  if (!Result[0]) {
    return res.status(404).send({ msg: Result[1] });
  }
  return res
    .status(200)
    .send({ msg: 'Preferences  found!', content: Result[1] });
}

export async function Add_Pref(req: Request & any, res: Response) {
  const body = req.body;
  const preference: any = await AddService(body, req.user.Id);
  if (preference[0]) {
    return res
      .status(200)
      .send({ msg: 'Preferences  found!', content: preference[1] });
  }
}

export async function Edit_Pref(req: Request & any, res: Response) {
  const id = req.params.id;
  const body = req.body;
  let preference = await EditService(body, id);
  if (preference) {
    res.status(200).send({ msg: 'success', content: preference });
  } else {
    res.send({ msg: 'not exist ' });
  }
}

export async function delete_Pref(req: Request & any, res: Response) {
  try {
    const preference = await DeleteService(req.params.id);
    if (!preference) {
      return res.status(404).send('Failed');
    }
    res.status(200).send('Done Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
