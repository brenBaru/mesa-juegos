import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  getDoc
} from "firebase/firestore";

import { db } from "../firebase";

export function gamesCollection(uid) {
  return collection(db, "users", uid, "games");
}

export function favsDoc(uid) {
  return doc(db, "users", uid, "meta", "favs");
}

export function subscribeGames(uid, callback) {
  return onSnapshot(gamesCollection(uid), (snapshot) => {
    const games = snapshot.docs.map((documento) => ({
      ...documento.data(),
      id: documento.id
    }));

    callback(games);
  });
}

export async function upsertGame(uid, game) {
  const ref = doc(db, "users", uid, "games", game.id);

  await setDoc(
    ref,
    {
      ...game,
      updatedAt: serverTimestamp(),
      createdAt: game.createdAt || serverTimestamp()
    },
    { merge: true }
  );
}

export async function deleteGame(uid, gameId) {
  await deleteDoc(doc(db, "users", uid, "games", gameId));
}

export async function getFavs(uid) {
  const ref = favsDoc(uid);
  const snapshot = await getDoc(ref);

  return snapshot.exists() ? snapshot.data().ids || [] : [];
}

export function subscribeFavs(uid, callback) {
  return onSnapshot(favsDoc(uid), (snapshot) => {
    const ids = snapshot.exists() ? snapshot.data().ids || [] : [];
    callback(ids);
  });
}

export async function setFavs(uid, ids) {
  await setDoc(favsDoc(uid), { ids }, { merge: true });
}