import { Searchbar, useTheme } from "react-native-paper";

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export const CitySearchbar = ({ value, onChange }: Props) => {
  const theme = useTheme();

  return (
    <Searchbar
      placeholder="Miasto..."
      value={value}
      onChangeText={onChange}
      style={{
        alignSelf: "stretch",
        backgroundColor: theme.colors.primaryContainer,
      }}
    />
  );
};
