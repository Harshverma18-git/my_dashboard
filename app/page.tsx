import { redirect } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  redirect("/login");
  return (
    <QueryClientProvider client={queryClient}>
      {/* <h1>React Query Installed ✅</h1> */}
    </QueryClientProvider>
  );
}