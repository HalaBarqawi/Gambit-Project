import { NextFunction, Request, Response } from 'express';
import {
  addPreference,
  deletePreferenceById,
  editPreferenceById,
  viewPreferenceById,
  viewPreferencs,
} from '../service/preference';

export async function getPreference(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    let preferences: any = await viewPreferencs(req.user.Id);
    return res
      .status(200)
      .send({ msg: 'Preferences are found!', content: preferences });
  } catch (e) {
    next(e);
  }
}

export async function getPreferenceId(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    let preference = await viewPreferenceById(req.params.id, req.user.Id);
    return res
      .status(200)
      .send({ msg: 'Preferences found!', content: preference });
  } catch (e) {
    console.log('There is an Exception');
    next(e);
  }
}
export async function postPreference(req: Request & any, res: Response) {
  const body = req.body;
  const preference = await addPreference(body, req.user.Id);
  if (preference) {
    return res
      .status(200)
      .send({ msg: 'Preference is added Successfully', content: preference });
  }
  return res.send('failed to post');
}

export async function editPreference(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const body = req.body;
    let preference = await editPreferenceById(body, id);
    return res.status(200).send({ msg: 'success', content: preference });
  } catch (e) {
    next(e);
  }
}

export async function deletePreference(req: Request & any, res: Response) {
  try {
    const preference = await deletePreferenceById(req.params.id);
    if (!preference) {
      return res.status(404).send('Failed');
    }
    res.status(200).send('Removed Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
