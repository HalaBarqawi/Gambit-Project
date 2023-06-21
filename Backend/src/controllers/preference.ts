import { Request, Response } from 'express';
import { Customer } from '../models/customer';
import { Preference } from '../models/preferences';
import {
  addPreference,
  deletePreferenceById,
  editPreferenceById,
  viewPreferenceById,
  viewPreferencs,
} from '../service/preference';

export async function getPreference(req: Request & any, res: Response) {
  let Result: any = await viewPreferencs(req.user.Id);

  if (!Result[0]) {
    return res.status(404).send({ msg: Result[1] });
  }
  return res
    .status(200)
    .send({ msg: 'Preferences  found!', content: Result[1] });
}

export async function getPreferenceId(req: Request & any, res: Response) {
  let Result: any = await viewPreferenceById(req.params.id, req.user.Id);
  if (!Result[0]) {
    return res.status(404).send({ msg: Result[1] });
  }
  return res
    .status(200)
    .send({ msg: 'Preferences  found!', content: Result[1] });
}
export async function postPreference(req: Request & any, res: Response) {
  const body = req.body;
  const preference: any = await addPreference(body, req.user.Id);
  if (preference[0]) {
    return res
      .status(200)
      .send({ msg: 'Preferences  found!', content: preference[1] });
  }
  return res.send('failed');
}

export async function editPreference(req: Request & any, res: Response) {
  const id = req.params.id;
  const body = req.body;
  let preference = await editPreferenceById(body, id);
  if (preference) {
    res.status(200).send({ msg: 'success', content: preference });
  } else {
    res.send({ msg: 'not exist ' });
  }
}

export async function deletePreference(req: Request & any, res: Response) {
  try {
    const preference = await  deletePreferenceById(req.params.id);
    if (!preference) {
      return res.status(404).send('Failed');
    }
    res.status(200).send('Done Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
