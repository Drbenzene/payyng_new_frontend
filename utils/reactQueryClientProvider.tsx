import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // cacheTime is valid here in the `queries` config
        // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
        staleTime: 1000 * 60 * 5, // optional: set staleTime as well if needed
      },
    },
  });

  // Check if window is defined (i.e., we're in a browser environment)
  const persister: any =
    typeof window !== "undefined"
      ? createSyncStoragePersister({
          storage: window.localStorage,
        })
      : null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </PersistQueryClientProvider>
  );
}

export default ReactQueryClientProvider;
