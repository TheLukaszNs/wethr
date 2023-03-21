import { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Switch,
  Text,
  Tooltip,
  useTheme,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { City } from "../api/types";
import { useContrast } from "../context/ContrastContext";

type Props = {
  city: string;
  onChange: (text: string) => void;
  onSubmit: (city: City) => void;
  cityHints: City[];
};

export const CustomHeader = ({
  city,
  onChange,
  onSubmit,
  cityHints,
}: Props) => {
  const [searching, setSearching] = useState(false);

  const theme = useTheme();
  const { colors } = useContrast();
  const { top } = useSafeAreaInsets();

  const handleSubmit = (city: City) => {
    onSubmit(city);
    onChange(city.name);
    setSearching(false);
  };

  const handleChange = (text: string) => {
    if (!searching) setSearching(true);

    onChange(text);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.navbar,
        paddingHorizontal: 24,
        paddingTop: top + 16,
        // paddingBottom: 16,
        borderBottomColor: colors.border,
        borderBottomWidth: 2,
      }}
    >
      <View
        style={{
          alignSelf: "stretch",
        }}
      >
        <TextInput
          defaultValue={city}
          onChangeText={(text) => handleChange(text)}
          style={{
            fontWeight: "700",
            fontSize: 24,
            alignSelf: "stretch",
            textAlign: "center",
            paddingBottom: 16,
          }}
          placeholder="Miasto..."
          placeholderTextColor={theme.colors.onSecondaryContainer}
        />
        {searching && cityHints.length > 0 && (
          <ScrollView
            style={{
              alignSelf: "stretch",
              maxHeight: 200,
              overflow: "hidden",
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
              alignSelf: "stretch",
              paddingVertical: 12,
            }}
          >
            {cityHints.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => {
                  handleSubmit(c);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  borderWidth: 2,
                  borderColor: theme.colors.onTertiaryContainer,
                  borderRadius: theme.roundness * 6,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: "white",
                }}
              >
                <Text
                  style={{
                    fontWeight: "900",
                    fontSize: 18,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {c.name}
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 12,
                    color: theme.colors.onSecondaryContainer,
                  }}
                >
                  {c.country}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
