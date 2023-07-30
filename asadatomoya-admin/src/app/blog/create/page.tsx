"use client";
import { type FC, useState } from "react";

import { Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

import { useZodForm } from "asadatomoya-common/hooks";
import { ArticleSchema } from "asadatomoya-common/models";

interface PageProps {}

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const Page: FC<PageProps> = ({}) => {
  // const [value, setValue] = useState("");

  const { register, handleSubmit, control, setValue, getValues } = useZodForm({
    schema: ArticleSchema,
    defaultValues: { slug: "", title: "", content: "", author: "", image: "" },
  });

  const onSubmit = (data) => {
    console.log("data:", data);
  };
  return (
    <div>
      <h1>blog create page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <TextField {...register("slug")} variant="outlined" />
          </div>
          <div className="flex">
            <div className="basis-1/2">
              {/* <Controller
                control={control}
                render={({ field }) => }
              /> */}
              <ReactQuill
                theme="snow"
                onChange={(content) => {
                  setValue("content", content);
                }}
                modules={modules}
              />

              <div>
                <Button type="submit">button</Button>
              </div>
            </div>

            <div className="basis-1/2">
              <div className="ql-snow">
                <div className="ql-editor">
                  <div dangerouslySetInnerHTML={{ __html: getValues("content") }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
