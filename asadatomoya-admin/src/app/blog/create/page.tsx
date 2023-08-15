"use client";
import { type FC, useState } from "react";

import { Button, TextField } from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill";

import { useZodForm } from "asadatomoya-common/hooks";
import { ArticleSchema } from "asadatomoya-common/models";

import { Endpoint } from "@/utils/endpoint";

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
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useZodForm({
    schema: ArticleSchema,
    defaultValues: { slug: "", title: "", content: "", author: "", image: "" },
  });

  const onSubmit = async (payload) => {
    console.log("payload:", payload);
    const { data } = await axios.post(Endpoint.BLOG, payload);
    console.log("data:", data);
  };
  return (
    <div>
      <h1>blog create page</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-screen-2xl py-6">
          <div className="mb-8">
            <TextField
              error={!!errors.slug?.message}
              fullWidth
              {...register("slug")}
              label="slug"
              variant="outlined"
              helperText={errors.slug?.message}
            />
          </div>
          <div className="mb-8">
            <TextField
              error={!!errors.title?.message}
              fullWidth
              {...register("title")}
              label="title"
              variant="outlined"
              helperText={errors.title?.message}
            />
          </div>
          <div className="mb-8 flex">
            <div className="basis-1/2">
              <ReactQuill
                theme="snow"
                onChange={(content) => {
                  setContent(content);
                  setValue("content", content);
                }}
                modules={modules}
              />
            </div>

            <div className="basis-1/2">
              <div className="ql-snow">
                <div className="ql-editor">
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Button fullWidth type="submit" variant="outlined">
                button
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
