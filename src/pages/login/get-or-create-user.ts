import { User } from 'firebase/auth';
import { Client, Resident } from '../../model';

export const getOrCreateClientUser = async (user: User) => {
  const email = user.email;
  if (!email) throw new Error('Email not found');
  const uid = user.uid;
  let client: Client | null;
  client = await Client.fromUserId(uid);
  if (client) return client;
  client = Client.fromJSON({ uid, email, requests: [] });
  await client.create();
  return client;
};

export const getOrCreateResidentUser = async (user: User) => {
  const email = user.email;
  if (!email) throw new Error('Email not found');
  const uid = user.uid;
  let resident: Resident | null;
  resident = await Resident.fromUserId(uid);
  if (resident) return resident;
  resident = Resident.fromJSON({ uid, email, requests: [], abode: [] });
  await resident.create();
  return resident;
};
