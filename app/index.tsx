import {
  Button,
  Appbar,
  Surface,
  Text,
  useTheme,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import { CustomHeader } from "../components/CustomHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../api/weather";
import { useDebounce } from "../hooks/useDebounce";

export default function Page() {
  const [city, setCity] = useState("Warszawa");
  const debouncedCity = useDebounce(city, 500);
  const theme = useTheme();

  const cityQuery = useQuery(
    ["cities", debouncedCity],
    () => getCities(debouncedCity),
    {
      enabled: city !== "",
    },
  );

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  console.log(cityQuery?.data?.results);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <CustomHeader city={city} onCityChange={handleCityChange} />

      <View style={styles.container}>
        <Searchbar
          loading={cityQuery.isLoading}
          placeholder="Miasto..."
          value={city}
          onChangeText={setCity}
          style={{
            alignSelf: "stretch",
          }}
        ></Searchbar>

        {cityQuery.isLoading
          ? null
          : cityQuery?.data?.results?.map(({ id, name, country }) => {
              return (
                <Surface
                  key={id}
                  elevation={0}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    marginVertical: 8,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 24,
                    }}
                  >
                    {name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 16,
                      color: theme.colors.onSurfaceVariant,
                    }}
                  >
                    {country}
                  </Text>
                </Surface>
              );
            })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cityName: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
