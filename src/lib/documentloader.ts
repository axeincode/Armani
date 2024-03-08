"use client";
// Utility function to load document file from URL as Blob
export const fetchDocumentBlob = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching document blob:", error);
    return null;
  }
};
