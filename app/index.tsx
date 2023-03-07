import { StyleSheet, Text, View } from "react-native";
import { Button, Appbar } from "react-native-paper";
import { Link, Stack } from "expo-router";

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ title: "Wethr 🌤️" }} />
    </View>
  );
}
