import { ComponentProps } from "react";
import { Appbar, Text } from "react-native-paper";
import { Stack, usePathname, useRouter } from "expo-router";

type ExcludeFunction<T> = T extends (...args: any[]) => any ? never : T;

type Props = Parameters<
  ExcludeFunction<ComponentProps<typeof Stack>["screenOptions"]>["header"]
>[0];

export const CustomHeader = ({ navigation, back, route, options }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content
        title={options.title ?? route.name}
        titleStyle={{
          fontWeight: "bold",
        }}
      />
      {pathname === "/" && (
        <Appbar.Action icon="cog" onPress={() => router.push("settings")} />
      )}
    </Appbar.Header>
  );
};
