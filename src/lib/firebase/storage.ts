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
