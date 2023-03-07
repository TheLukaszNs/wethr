import { View } from "react-native";
import { Stack } from "expo-router";

export default function SettingsPage() {
  return (
    <View>
      <Stack.Screen options={{ title: "Ustawienia" }} />
    </View>
  );
}
