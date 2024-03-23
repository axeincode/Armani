"use client";
import React, { useState } from "react";
import { Spinner, Button } from "@material-tailwind/react";
import { DocumentTypes } from "@/types/editor.types";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { fetchDocumentBlob } from "@/lib/documentloader";

export type DocViewerManagerProps = {
  open: boolean;
  selectedDocument: DocumentTypes;
  handler: () => void;
};

const DocViewerManager = ({
  open,
  selectedDocument,
  handler,
}: DocViewerManagerProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const documentRef = React.useRef<any>(null);
  const [blobUrl, setBlobUrl] = useState<string>("");
  const [docs, setDocs] = useState<any>([]);

  React.useEffect(() => {
    if (open) {
      const url = selectedDocument.url;
      setIsLoading(true);
      fetchDocumentBlob(url)
        .then((blob) => {
          if (blob) {
            const newBlobUrl = URL.createObjectURL(blob);
            setBlobUrl(newBlobUrl);
          }
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
  }, [selectedDocument, open]);

  React.useEffect(() => {
    if (blobUrl) {
      setDocs([
        {
          // @ts-ignore
          uri: blobUrl,
          fileName: selectedDocument.name,
        },
      ]);
    }
    // Cleanup function to revoke object URL when component unmounts
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl, selectedDocument]);

  return (
    <div className="h-full">
      {isLoading && (
        <div className="flex items-center justify-center h-12">
          <Spinner color="light-blue" className="h-12 w-12" />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-12">
          <span>Failed to load workbook</span>
        </div>
      )}
      {!isLoading && !isError && docs.length === 0 && (
        <div className="flex items-center justify-center h-12">
          <span>No document to display</span>
        </div>
      )}
      {!isLoading && !isError && docs.length > 0 && (
        <>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            ref={documentRef}
          />
        </>
      )}
      <div className="flex flex-grow gap-2 justify-end">
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={() => {}}>
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default DocViewerManager;
