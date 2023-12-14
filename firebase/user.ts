
import UserModel from '../@types/user';
import { UserCollectionName } from '.';
import Encrypt from '../modules/encrypt';
import Utils from '../modules/utils';
import { fAuth, fDb, FireBase } from './config';



export const loginAnanomosly = async () => {
  return await fAuth.signInAnonymously();
}

export const authenticate = async (address: string) => {
  const isLoggedIn = fAuth.currentUser;
  if (!isLoggedIn) {
    await loginAnanomosly();
  }

  const userExist = await fetchUserByAddress(address);

  if (!userExist) {
    return await cerateAccountWithWalletAddress( `${address}`);
  }
  return userExist;
}

const getLoginCredentials = (address: string) => {
  if (!address) return [];
  const pwd = Encrypt.hash(address.substring(address.length / 2), 'sha256');
  let host = location.hostname;
  if (host.includes('localhost') || host.includes('127.0.0.1')) host = host + '.local';
  const email = Encrypt.hash(address, 'md5') + '@' + host;

  return [email, pwd];
}
export const cerateAccountWithWalletAddress = async (address: string) => {
  const [email, pwd] = getLoginCredentials(address);
  if (!email || !pwd) return;
  const credentials = FireBase.auth.EmailAuthProvider.credential(email, pwd);
  const user = await fAuth.currentUser?.linkWithCredential(credentials);
  if (!user || !user.user) return;
  const userData: UserModel = {
    firstName: "",
    lastName: "",
    email: email,
    isAdmin: false,
    uid: user.user.uid,
    wallet: address,
  }
  await fDb.collection(UserCollectionName).doc(user.user.uid).set(userData);
  return userData;
}
export const logintWithWalletAddress = async (address: string) => {
  const [email, pwd] = getLoginCredentials(address);
  return await fAuth.signInWithEmailAndPassword(email, pwd);
}
export const fetchUser = async (uid: string): Promise<UserModel | null> => {
  const userDoc = await fDb.collection(UserCollectionName).doc(uid).get();
  if (!userDoc.exists) return null;
  return userDoc.data() as UserModel;
};

export const fetchUserByAddress = async (address: string): Promise<UserModel | null> => {
  const userDoc = await fDb.collection(UserCollectionName).where('wallet', '==', address).get();
  if (userDoc.size === 0) return null;
  return userDoc.docs[0].data() as UserModel;
};

export const $UpdateUserDoc = async (uid: string, data: any) => {
  await fDb.collection(UserCollectionName).doc(uid).update(data);
};