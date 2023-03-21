import {
  Button,
  Appbar,
  Surface,
  Text,
  useTheme,
  Searchbar,
  ActivityIndicator,
  SegmentedButtons,
} from "react-native-paper";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import { CustomHeader } from "../components/CustomHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/weather";
import { useDebounce } from "../hooks/useDebounce";
import { useAtom } from "jotai/react";
import { cityAtom } from "../store/root";
import { CitySearchbar } from "../components/CitySearchbar";
import { City } from "../api/types";
import { WeatherSection } from "../components/WeatherSection";
import { useContrast } from "../context/ContrastContext";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Page() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState<City>();

  const debouncedQuery = useDebounce(query, 500);

  const { bottom } = useSafeAreaInsets();
  const { colors, contrastMode, setContrastMode } = useContrast();
  const theme = useTheme();

  const cityListQuery = useQuery(
    ["cities", debouncedQuery],
    () => getCities(query),
    {
      enabled: debouncedQuery.length > 2,
    },
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: bottom + 12,
      }}
    >
      <CustomHeader
        city={city?.name}
        onChange={(c) => {
          setQuery(c);
        }}
        onSubmit={(c) => {
          setCity(c);
        }}
        cityHints={cityListQuery.data?.results ?? []}
      />

      {city && (
        <WeatherSection longitude={city?.longitude} latitude={city?.latitude} />
      )}
      <View
        style={{
          marginTop: "auto",
          paddingHorizontal: 24,
          gap: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <SegmentedButtons
          value={contrastMode}
          onValueChange={setContrastMode}
          buttons={[
            {
              label: "Normalny",
              value: "normal",
              uncheckedColor: colors.text,
            },
            {
              label: "Wysoki",
              value: "high",
              style: {
                backgroundColor:
                  contrastMode === "high" ? colors.navbar : "transparent",
              },
            },
          ]}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}
