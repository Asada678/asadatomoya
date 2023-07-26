import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useZodForm<O extends z.ZodObject<any, any, any>>({
  schema,
  defaultValues,
}: {
  schema: O;
  defaultValues: z.infer<O>;
}) {
  return useForm<z.infer<O>>({
    resolver: zodResolver(schema),
    // @ts-ignore // TODO 呼び出し側で補完はできるので一旦無視
    defaultValues,
  });
}
