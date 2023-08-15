import { type FC } from "react";

import Link from "next/link";

import { Button } from "@mui/material";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <div>
      <h1>blog page</h1>
      <div>
        <Link href={"/blog/create"}>
          <Button variant="contained">新規作成</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
