import { createContext, useState, useContext } from "react";
import { useTheme } from "react-native-paper";

type ContrastContextType = {
  contrastMode: "normal" | "high";
  setContrastMode: (mode: "normal" | "high") => void;
  colors: {
    navbar: string;
    background: string;
    accent: string;
    text: string;
    border: string;
  };
};

export const ContrastContext = createContext<ContrastContextType | null>(null);

export const useContrast = () => {
  const context = useContext(ContrastContext);

  if (context === undefined) {
    throw new Error("useContrast must be used within a ContrastProvider");
  }

  return context;
};

export const ContrastProvider = ({ children }) => {
  const theme = useTheme();

  const [contrastMode, setContrastMode] =
    useState<ContrastContextType["contrastMode"]>("high");

  const colors: Record<typeof contrastMode, ContrastContextType["colors"]> = {
    normal: {
      accent: theme.colors.tertiaryContainer,
      background: theme.colors.surface,
      navbar: theme.colors.secondaryContainer,
      text: "black",
      border: "black",
    },
    high: {
      accent: "yellow",
      background: "black",
      navbar: "yellow",
      text: "yellow",
      border: "black",
    },
  };

  return (
    <ContrastContext.Provider
      value={{
        contrastMode,
        setContrastMode,
        colors: colors[contrastMode],
      }}
    >
      {children}
    </ContrastContext.Provider>
  );
};
