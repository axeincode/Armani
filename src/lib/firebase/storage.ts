import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

export async function updateDeckImage(id: string, image: any) {
  try {
    if (!id) throw new Error("No deckId has been provided.");

    if (!image || !image.name)
      throw new Error("A valid image has not been provided.");

    const publicImageUrl = await uploadDeckImage(id, image);
    /// await updateImageReference(deckId, publicImageUrl);
    console.log("imageUrl", publicImageUrl);
    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadDeckImage(id: string, image: any) {
  const filePath = `images/${id}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);
  const imageUrlRef = await getDownloadURL(newImageRef);
  return imageUrlRef;
}

// write a function to delete image reference
export async function deleteImageReference(id: string, imageName: string) {
  try {
    const filePath = `images/${id}/${imageName}`;
    const imageRef = ref(storage, filePath);
    await deleteObject(imageRef);
    console.log(`Image with id ${id} has been deleted.`);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

// write a function to upload document to storage
export async function uploadDocumentToStorage(id: string, document: any) {
  const filePath = `documents/${id}/${document.name}`;
  const newDocumentRef = ref(storage, filePath);
  await uploadBytesResumable(newDocumentRef, document);
  const documentUrlRef = await getDownloadURL(newDocumentRef);
  return documentUrlRef;
}

// write a function to delete document reference
export async function deleteDocumentReference(
  id: string,
  documentName: string
) {
  try {
    const filePath = `documents/${id}/${documentName}`;
    const documentRef = ref(storage, filePath);
    await deleteObject(documentRef);
    console.log(`Document with id ${id} has been deleted.`);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
}

// download document to a blob locally using document id
export async function downloadDocument(id: string, documentName: string) {
  try {
    const filePath = `documents/${id}/${documentName}`;
    const documentRef = ref(storage, filePath);
    const url = await getDownloadURL(documentRef);
    // fetch type buffer;
    const response = await fetch(url);
    if (response.ok) {
      // Read response as ArrayBuffer
      const buffer = await response.arrayBuffer();
      // Now 'buffer' contains the response data as a buffer
      console.log(buffer);
      return buffer;
    } else {
      // Handle error if the fetch was not successful
      console.error(
        "Failed to fetch data:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
}

// download document as arraybuffer locally using document id
export async function downloadDocumentAsArrayBuffer(
  id: string,
  documentName: string
) {
  try {
    const filePath = `documents/${id}/${documentName}`;
    const documentRef = ref(storage, filePath);
    const url = await getDownloadURL(documentRef);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
}

// update existing document with blob data to storage
export async function updateDocument(id: string, name: any, document: any) {
  try {
    const filePath = `documents/${id}/${name}`;
    const documentRef = ref(storage, filePath);
    await uploadBytesResumable(documentRef, document);
    const documentUrlRef = await getDownloadURL(documentRef);
    return documentUrlRef;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
}
