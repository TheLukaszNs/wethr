import { useState } from "react";
import { TextInput, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Switch,
  Text,
  Tooltip,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  city: string;
  onCityChange: (city: string) => void;
};

export const CustomHeader = ({ city, onCityChange }: Props) => {
  const theme = useTheme();

  return (
    <Appbar.Header>
      <Appbar.Content
        title={city}
        titleStyle={{
          fontWeight: "700",
          fontSize: 24,
        }}
      />
    </Appbar.Header>
  );
};
