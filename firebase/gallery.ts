

import { GalleryCollectionName, UserCollectionName } from '.';
import UserData from '../../../web_projects/transcendexchange/models/user';
import Encrypt from '../modules/encrypt';
import getIpInfo from '../modules/ip_lookup';
import Utils from '../modules/utils';
import { fAuth, fDb, FireBase } from './config';


export interface IGallery {
  id: string;
  collectionId: string;
  amount: number;
  amountInUsd: number,
  name: string,
  url: string,
  author: string,
  authorAddress: string,
  likes: number,
  createdOn: string,
  timestamp: number,
  metadata: any
}


export const uploadGalleryItem = async ({ id, amount, authorAddress, authorUid, nfts, metadata }: { id: string, amount: number, authorUid: string, authorAddress: string, nfts: Array<string>, metadata: any }): Promise<void | null> => {
  const batch = fDb.batch();
  nfts.forEach((e) => {
    const data: IGallery = {
      collectionId: id,
      id: Utils.uniqueId(12),
      amount,
      amountInUsd: amount,
      name: "",
      url: e,
      author: authorUid,
      authorAddress: authorAddress,
      likes: 0,
      createdOn: new Date().toLocaleString(),
      timestamp: Date.now(),
      metadata: metadata
    }
    batch.set(fDb.collection(GalleryCollectionName).doc(data.id), data);
  });
  return await batch.commit();
};
export const fetchGalleryItem = async (id: string): Promise<IGallery | null> => {
  const galleryItemDoc = await fDb.collection(GalleryCollectionName).doc(id).get();
  if (!galleryItemDoc.exists) return null;
  return galleryItemDoc.data() as IGallery;
};

export const fetchGalleyByAuthor = async (uid: string): Promise<IGallery | null> => {
  const galleryItemDoc = await fDb.collection(GalleryCollectionName).where('uid', '==', uid).get();
  if (galleryItemDoc.size === 0) return null;
  return galleryItemDoc.docs[0].data() as IGallery;
};
export const fetchGalleyByWalletAddress = async (address: string): Promise<IGallery | null> => {
  const galleryItemDoc = await fDb.collection(GalleryCollectionName).where('authorAddress', '==', address).get();
  if (galleryItemDoc.size === 0) return null;
  return galleryItemDoc.docs[0].data() as IGallery;
};

export const $UpdateUserDoc = async (uid: string, data: any) => {
  await fDb.collection(UserCollectionName).doc(uid).update(data);
};