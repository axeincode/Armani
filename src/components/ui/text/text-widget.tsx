import React, { useRef, useState } from "react";
import { Textarea, Typography, Button } from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import { get, debounce, isEmpty } from "lodash";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { WidgetElement } from "@/types";

export interface TextWidgetProps {
  data?: any;
  isView?: boolean;
}
export const TextWidget = ({ data, isView }: TextWidgetProps) => {
  const [editorValue, setEditorValue] = React.useState("");
  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);

  const txtData = get(data, "data", { id: 0, text: "", title: "" });
  // state
  const editorObs$ = useEditorObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const selectedWidgetRepo = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetRepo.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  React.useEffect(() => {
    setEditorValue(txtData.text);
  }, [txtData]);

  const handleOnChange = (e: any) => {
    console.log("editor value changed", e);
  };

  const handleOnClickEditor = () => {
    selectedWidgetRepo.setSelectedWidget(
      data.id,
      currentPage$.pageId!,
      WidgetElement.PARAGRAPH
    );
  };

  const cancel = () => {};

  const handleOnEditorChange = React.useCallback(() => {
    const e = editorValue;
    if (!isEmpty(editorWidgetState)) {
      const txtData = get(data, "data", { id: 0, text: "", title: "" });
      editorObs$.updateWidget(data.id, {
        ...editorWidgetState,
        data: {
          id: txtData.id,
          text: e,
          title: txtData.title,
        },
      });
    }
  }, [editorObs$, editorWidgetState, editorValue, data]);

  const handeSaveContent = React.useCallback(
    (e: string) => {
      if (!isEmpty(editorWidgetState)) {
        const txtData = get(data, "data", { id: 0, text: "", title: "" });
        editorObs$.updateWidget(data.id, {
          ...editorWidgetState,
          data: {
            id: txtData.id,
            text: e,
            title: txtData.title,
          },
        });
      }
    },
    [editorObs$, editorWidgetState, data]
  );

  return (
    <div className="flex flex-col flex-grow w-full gap-2">
      {!isView && (
        <>
          {!isEmpty(txtData.title) && (
            <Typography
              variant="h6"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {txtData.title || ""}
            </Typography>
          )}
          <>
            <Editor
              // @ts-ignore
              onInit={(evt, editor) => (editorRef.current = editor)}
              apiKey="i86omrgpdaqm9vsa3xzdv1flo1i5o6ib5xrsyah35oqckmsp"
              init={{
                // @ts-ignore
                selector: "#tinymce",
                setup: function (editor) {
                  editor.ui.registry.addIcon(
                    "custom-save",
                    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#222f3e80" class="bi bi-save" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"></path>
                  </svg>`
                  );

                  editor.ui.registry.addButton("customSave", {
                    icon: "custom-save",
                    tooltip: "Save",
                    onAction: function (_) {
                      // Define what should happen when the button is clicked
                      console.log(editor.getContent());
                      handeSaveContent(editor.getContent());
                    },
                  });
                },
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "customSave | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | restoredraft",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request: any, respondWith: any) =>
                  respondWith.string(() =>
                    Promise.reject("See docs to implement AI Assistant")
                  ),
              }}
              initialValue={editorValue || "Start editing here..."}
              onClick={handleOnClickEditor}
              value={editorValue || ""}
              onEditorChange={(e) => {
                setEditorValue(e);
              }}
            />
          </>
        </>
      )}
      {isView && (
        <>
          {!isEmpty(txtData.title) && (
            <Typography
              variant="h6"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {txtData.title || ""}
            </Typography>
          )}
          <Editor
            apiKey="i86omrgpdaqm9vsa3xzdv1flo1i5o6ib5xrsyah35oqckmsp"
            init={{
              // @ts-ignore
              readonly: true,
              toolbar: false,
              menubar: false,
              readOnly: true,
            }}
            initialValue={txtData.text}
            disabled={true}
          />
        </>
      )}
    </div>
  );
};
