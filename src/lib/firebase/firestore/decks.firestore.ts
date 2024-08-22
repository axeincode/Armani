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
import { PageTypes } from "@/types/editor.types";

/** Add new realestate deck with sample data */
export async function addNewDeck(id: string) {
  const pages: PageTypes[] = deckPageConfigs.map((pageConfig) => {
    const pageId = v4();
    return {
      id: pageId,
      pageId: pageId,
      type: "page",
      pageNumber: pageConfig.pageIndex,
      title: pageConfig.title,
      index: pageConfig.pageIndex,
      name: pageConfig.title,
      iconName: pageConfig.iconName,
      status: "draft", // draft, published, archived
      widgets: [],
      order: pageConfig.pageIndex,
    };
  });

  const data = {
    id,
    deckId: id,
    name: "My New Deck",
    background: "#252121",
    navbar: "#252121",
    sidebar: "#252121",
    fontFamily: "sans-serif",
    shadow: true,
    title: "My New Deck",
    subtitle: "Subtitle",
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
    visits: {
      total: 0,
      last7Days: 0,
      last30Days: 0,
    },
    coverPhoto:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 300w",
    logo: null,
    disclaimer: {
      enabled: false,
      title: "Disclaimer",
      description: "Disclaimer Description",
    },
    nda: {
      enabled: false,
      title: "NDA",
      askFor: "Name, Email, Phone",
      description: "NDA Description",
    },
    pages: pages,
  };
  try {
    const docRef = await addDoc(collection(db, "decks"), data);
    return docRef.id;
  } catch (e) {
    console.log("There was an error adding the document");
    console.error("Error adding document: ", e);
    throw e;
  }
}

// implement delete deck
export async function deleteDeck(deckId: string) {
  try {
    const q = query(collection(db, "decks"), where("id", "==", deckId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const id = querySnapshot.docs[0].id;
      if (!id) throw new Error("Document not found");
      await deleteDoc(doc(db, "decks", id));
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("There was an error deleting the document");
    console.error("Error deleting document: ", e);
    throw e;
  }
}

// fetch deck by id
export async function getDeck(id: string) {
  try {
    const q = query(collection(db, "decks"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Assuming that objectId is unique and only one doc will match
      return querySnapshot.docs[0].data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.log("There was an error getting the document");
    console.error("Error getting document: ", e);
    throw e;
  }
}

// fetch all decks
export async function getDecks() {
  try {
    const q = query(collection(db, "decks"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const decks: any = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      decks.push(doc.data());
    });
    return decks;
  } catch (e) {
    console.log("There was an error getting the documents");
    console.error("Error getting documents: ", e);
    throw e;
  }
}

// update deck
export async function updateDeck(deckId: string, data: any) {
  try {
    const q = query(collection(db, "decks"), where("id", "==", deckId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const id = querySnapshot.docs[0].id;
      if (!id) throw new Error("Document not found");
      await updateDoc(doc(db, "decks", id), {
        ...data,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    }
  } catch (e) {
    console.log("There was an error updating the document");
    console.error("Error updating document: ", e);
    throw e;
  }
}

export async function updateImageReference(deckId: any, publicImageUrl: any) {
  try {
    const q = query(collection(db, "decks"), where("id", "==", deckId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const id = querySnapshot.docs[0].id;
      if (!id) throw new Error("Document not found");
      const deckRef = doc(db, "decks", id);
      if (deckRef) {
        await updateDoc(deckRef, { photo: publicImageUrl });
      }
    }
  } catch (e) {
    console.log("There was an error updating the document");
    console.error("Error updating document: ", e);
    throw e;
  }
}
