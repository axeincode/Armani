import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { v4 } from "uuid";
import { deckPageConfigs } from "@/constants/pages";
import { Agreement } from "@/types/editor.types";

const collectionName = "agreements";
export async function addAgreement(data: Agreement) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}
export async function updateAgreement(id: string, data: any) {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log("Document updated with ID: ", id);
    return id;
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
}
export async function deleteAgreement(id: string) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log("Document deleted with ID: ", id);
    return true;
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
}
export async function getAgreement(id: string) {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
}

export async function getAgreementByUser(uid: string) {
  try {
    const q = query(collection(db, collectionName), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userAgreements: Agreement[] = [];
      querySnapshot.forEach((doc) => {
        console.log("userAgreement", doc.id, " => ", doc.data());
        const docData = doc.data();
        userAgreements.push({
          id: doc.id,
          deckId: docData.deckId,
          title: docData.title,
          content: docData.content,
          uid: docData.uid,
          email: docData.email,
          accepted: docData.accepted,
          createdAt: docData.createdAt,
          updatedAt: docData.updatedAt,
        });
      });
      return userAgreements;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
}

export async function getAgreements() {
  try {
    const q = query(collection(db, collectionName), orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);
    const agreements: any = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      agreements.push({ id: doc.id, ...doc.data() });
    });
    return agreements;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
}

export async function fetchAndUpdateAgreement(ndaData: Agreement) {
  const { deckId, uid } = ndaData;
  if (!deckId || !uid) throw new Error("deckId and uid are required");
  const q = query(
    collection(db, collectionName),
    where("deckId", "==", deckId),
    where("user", "==", uid)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const id = querySnapshot.docs[0].id;
    if (!id) throw new Error("Document not found");
    await updateDoc(doc(db, collectionName, id), {
      ...ndaData,
      uid,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } else {
    await addAgreement(ndaData);
  }
}
