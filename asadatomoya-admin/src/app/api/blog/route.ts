import { Amplify, Auth } from "aws-amplify";
import { z } from "zod";

import { ArticleSchema } from "asadatomoya-common/models";

import awsExports from "@/aws-exports";

Amplify.configure({ ...awsExports });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug } = ArticleSchema.parse(body);

    console.log("body:", body);

    const user = await Auth.currentAuthenticatedUser();
    console.log("user:", user);

    // console.log("Auth:", Auth);
    // const SSR = withSSRContext({ req });
    // console.log("SSR.Credentials:", SSR.Credentials);
    // const credentials: Credentials = await SSR.API.Auth.currentCredentials();
    // console.log("credentials:", credentials);
    return new Response(slug);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    console.log("error:", error);

    return new Response("Could not create subreddit", { status: 500 });
  }
}
