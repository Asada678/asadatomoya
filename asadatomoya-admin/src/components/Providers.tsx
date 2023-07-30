"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <Authenticator.Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Authenticator.Provider>
  );
};

export default Providers;
