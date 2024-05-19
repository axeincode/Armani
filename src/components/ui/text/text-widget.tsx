import React from "react";
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
              apiKey="i86omrgpdaqm9vsa3xzdv1flo1i5o6ib5xrsyah35oqckmsp"
              init={{
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | save",
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
              initialValue="Start editing here..."
              onClick={handleOnClickEditor}
              onChange={handleOnChange}
              onEditorChange={(e) => {
                setEditorValue(e);
              }}
              value={editorValue || ""}
            />

            <div className="flex my-2 gap-2">
              <Button
                variant="outlined"
                size="sm"
                color="blue"
                className="inline-flex items-center gap-2"
                onClick={handleOnEditorChange}
              >
                Save
              </Button>
            </div>
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
            }}
            initialValue={txtData.text}
          />
        </>
      )}
    </div>
  );
};
