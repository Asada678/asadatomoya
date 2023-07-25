import { type FC } from "react";

import { useMutation } from "@tanstack/react-query";

import { useZodForm } from "asadatomoya-common/hooks";
import { User, UserSchema } from "asadatomoya-common/models";
import { AdminApiEndpoint, post } from "asadatomoya-common/utils";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { register, handleSubmit } = useZodForm({
    schema: UserSchema,
    defaultValues: { username: "", password: "" },
  });

  const { mutate: createUser } = useMutation({
    mutationFn: async ({ username, password, regUser }: User) => {
      await post<User>({
        endpoint: AdminApiEndpoint.USER,
        payload: { username, password },
      });
    },
    onError: (error) => {},
    onSuccess: (data) => {},
  });
  return <div>template page</div>;
};

export default Page;
