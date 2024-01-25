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

/** Add new realestate deck with sample data */
export async function addNewDeck(id: string) {
  const pages = deckPageConfigs.map((pageConfig) => {
    return {
      id: id,
      pageId: v4(),
      type: "page",
      index: pageConfig.pageIndex,
      name: pageConfig.title,
      icon: pageConfig.iconName,
      status: "draft", // draft, published, archived
      widgets: [],
    };
  });

  const data = {
    id,
    deckId: id,
    name: "My New Deck",
    background: "white",
    sidebar: "light",
    fontFamily: "sans-serif",
    shadow: "light",
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
    logo: "https://firebasestorage.googleapis.com/v0/b/real-estate-website-1.appspot.com/o/real-estate%2Flogo.png?alt=media&token=3b8b8b1e-7b9e-4b9e-9b0a-9b9b9b9b9b9b",
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
export async function deleteDeck(id: string) {
  try {
    await deleteDoc(doc(db, "decks", id));
    return true;
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
