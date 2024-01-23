import { generateFakeRestaurantsAndReviews } from "../../fakeRestaurants";

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
      icon: pageConfig.icon,
      status: "draft", // draft, published, archived
      widgets: [],
    };
  });

  const data = {
    id,
    name: "My New Deck",
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
