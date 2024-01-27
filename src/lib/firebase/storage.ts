import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function updateDeckImage(deckId: string, image: any) {
  try {
    if (!deckId) throw new Error("No deckId has been provided.");

    if (!image || !image.name)
      throw new Error("A valid image has not been provided.");

    const publicImageUrl = await uploadDeckImage(deckId, image);
    /// await updateImageReference(deckId, publicImageUrl);
    console.log("imageUrl", publicImageUrl);
    return publicImageUrl;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadDeckImage(deckId: string, image: any) {
  const filePath = `images/${deckId}/${image.name}`;
  const newImageRef = ref(storage, filePath);
  await uploadBytesResumable(newImageRef, image);
  const imageUrlRef = await getDownloadURL(newImageRef);
  return imageUrlRef;
}
