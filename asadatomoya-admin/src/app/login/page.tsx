"use client";
import { type FC } from "react";

import { redirect } from "next/navigation";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify, I18n } from "aws-amplify";

import awsConfig from "@/aws-exports";

I18n.setLanguage("ja");

I18n.putVocabulariesForLanguage("ja", {
  "Sign in": "ログイン",
  "Forgot your password?": "パスワードをリセット",
});

const formFields = {
  signIn: {
    username: {
      placeholder: "ユーザ名を入力",
      isRequired: true,
      label: "ユーザ名",
    },
    password: {
      placeholder: "パスワードを入力",
      isRequired: true,
      label: "パスワード",
    },
  },
};

Amplify.configure(awsConfig);

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  if (authStatus !== "authenticated")
    return (
      <Authenticator hideSignUp={true} formFields={formFields}>
        {({}) => <main></main>}
      </Authenticator>
    );

  redirect("/home");
};

export default Page;
