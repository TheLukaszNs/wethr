import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Badge, Text, useTheme } from "react-native-paper";
import { City } from "../api/types";
import { getWeather } from "../api/weather";
import { RefreshControl, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { format, getDate, startOfHour } from "date-fns";
import { pl } from "date-fns/locale";
import { descriptions } from "../api/codes";
import { formatInTimeZone } from "date-fns-tz";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContrast } from "../context/ContrastContext";

type Props = Pick<City, "longitude" | "latitude">;

export const WeatherSection = ({ longitude, latitude }: Props) => {
  const theme = useTheme();
  const { colors, contrastMode } = useContrast();

  const weatherQuery = useQuery(
    ["weather", { longitude, latitude }],
    () => getWeather({ longitude, latitude }),
    {
      enabled: longitude !== undefined && latitude !== undefined,
    },
  );

  const date = startOfHour(new Date());

  const currentWeather = useMemo(() => {
    if (!weatherQuery.data) return;

    const index = weatherQuery.data.hourly.time.findIndex(
      (w) => w === format(date, "yyyy-MM-dd'T'HH:mm"),
    );

    const dailyIndex = weatherQuery.data.daily.time.findIndex(
      (w) => w === format(date, "yyyy-MM-dd"),
    );

    const { hourly, daily } = weatherQuery.data;

    return {
      time: new Date(hourly.time[index]),
      timezone: weatherQuery.data.timezone,
      description: descriptions[hourly.weathercode[index]]!.description,
      temperature: hourly.temperature_2m[index],
      apparentTemperature: hourly.apparent_temperature[index],
      surfacePressure: hourly.surface_pressure[index],
      visibility: hourly.visibility[index],
      sunrise: new Date(daily.sunrise[dailyIndex]),
      sunset: new Date(daily.sunset[dailyIndex]),
    };
  }, [weatherQuery.data, date]);

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: 24,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl
          refreshing={weatherQuery.isLoading}
          onRefresh={weatherQuery.refetch}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {currentWeather ? (
        <View
          style={{
            gap: 24,
            alignItems: "center",
            alignSelf: "stretch",
            paddingHorizontal: 24,
            // flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: colors.navbar,
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignSelf: "center",
              borderColor: theme.colors.onSecondaryContainer,
              borderWidth: 2,
              borderRadius: theme.roundness * 4,
            }}
          >
            <Text
              style={{
                fontSize: contrastMode === "normal" ? 16 : 18,
                fontWeight: "700",
                color: theme.colors.onSecondaryContainer,
              }}
            >
              {formatInTimeZone(
                currentWeather.time,
                currentWeather.timezone,
                "EEEE, dd MMMM HH:mm",
                {
                  locale: pl,
                },
              )}
            </Text>
          </View>
          <Text
            style={{
              fontSize: contrastMode === "normal" ? 16 : 20,
              fontWeight: "700",
              color: colors.text,
            }}
          >
            {currentWeather.description}
          </Text>
          <Text
            style={{
              fontSize: 108,
              fontWeight: "900",
              lineHeight: 108,
              color: colors.text,
            }}
          >
            {currentWeather.temperature.toFixed(0)}&deg;C
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "stretch",
              backgroundColor: colors.accent,
              paddingVertical: 24,
              paddingHorizontal: 24,
              borderRadius: theme.roundness * 4,
              borderWidth: 2,
              borderColor: theme.colors.onTertiaryContainer,
              // marginTop: "auto",
            }}
          >
            <DetailsRowItem
              label="Odczuwalna"
              value={`${currentWeather.apparentTemperature.toFixed(0)}°C`}
              icon="thermometer"
            />

            <DetailsRowItem
              label="Ciśnienie"
              value={`${currentWeather.surfacePressure.toFixed(0)} hPa`}
              icon="air-filter"
            />

            <DetailsRowItem
              label="Widoczność"
              value={`${(currentWeather.visibility / 1000).toFixed(0)} km`}
              icon="eye-outline"
            />
          </View>

          <Text
            style={{
              fontSize: contrastMode === "normal" ? 18 : 24,
              alignSelf: "flex-start",
              textAlign: contrastMode === "normal" ? "justify" : "left",
              color: colors.text,
            }}
          >
            Dzisiaj wschodu słońca można spodziewać się o{" "}
            <Text
              style={{
                fontWeight: "900",
                color: colors.text,
              }}
            >
              {formatInTimeZone(
                currentWeather.sunrise,
                currentWeather.timezone,
                "HH:mm",
                {
                  locale: pl,
                },
              )}
            </Text>
            , natomiast zachodu o{" "}
            <Text
              style={{
                fontWeight: "900",
                color: colors.text,
              }}
            >
              {formatInTimeZone(
                currentWeather.sunset,
                currentWeather.timezone,
                "HH:mm",
                {
                  locale: pl,
                },
              )}
            </Text>
            .
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const DetailsRowItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: keyof typeof Icon.glyphMap;
}) => {
  const { contrastMode } = useContrast();

  return (
    <View
      style={{
        alignItems: "center",
        gap: 8,
      }}
    >
      <Icon name={icon} size={32} />
      <Text
        style={{
          fontSize: contrastMode === "normal" ? 18 : 16,
          fontWeight: "700",
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: contrastMode === "normal" ? 12 : 16,
          fontWeight: contrastMode === "normal" ? "500" : "700",
        }}
      >
        {label}
      </Text>
    </View>
  );
};
