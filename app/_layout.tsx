import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { CustomHeader } from "../components/CustomHeader";
import { StatusBar } from "expo-status-bar";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query/build/lib/QueryClientProvider";
import { ContrastProvider } from "../context/ContrastContext";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <ContrastProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </ContrastProvider>
        </PaperProvider>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </>
  );
}
