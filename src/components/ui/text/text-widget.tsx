import React from "react";
import { Textarea, Typography } from "@material-tailwind/react";
import { Editor } from "@tinymce/tinymce-react";
import { get, isEmpty } from "lodash";

export interface TextWidgetProps {
  data?: any;
  isView?: boolean;
}
export const TextWidget = ({ data, isView }: TextWidgetProps) => {
  const [localData, setLocalData] = React.useState(data);
  const txtData = get(data, "data", { id: 0, text: "", title: "" });

  // effect to update internal state
  React.useEffect(() => {
    setLocalData(data?.text || "");
  }, [data]);

  const handleOnClickEditor = () => {
    console.log("editor clicked");
  };

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
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
          <Typography
            variant="small"
            color="blue-gray"
            data-id="INTERNAL_WIDGET"
            className="m-1"
          >
            {txtData.text || "..."}
          </Typography>
        </>
      )}
    </div>
  );
};
