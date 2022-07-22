import { QueryClient } from "react-query";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
    },
  },
});

export default queryClient;
