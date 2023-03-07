import { Slot, Stack } from "expo-router";
import { Provider as PaperProvider, Button, Appbar } from "react-native-paper";
import { CustomHeader } from "../components/CustomHeader";

export default function Layout() {
  return (
    <>
      <PaperProvider>
        <Stack
          screenOptions={{
            header: (props) => <CustomHeader {...props} />,
          }}
        />
      </PaperProvider>
    </>
  );
}
