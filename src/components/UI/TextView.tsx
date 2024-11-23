import useSize from "@app/hooks/useSize";
import { ITextProps, Text, useColorMode, useTheme } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React from "react";

interface TextViewProps extends ITextProps {
  children: React.ReactNode;
}

const TextView: React.FC<TextViewProps> = ({
  children,
  numberOfLines = 1,
  ellipsizeMode = "tail", // Ensure ellipsis mode is set to 'tail' to handle long text
  ...props
}) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const textColor =
    colorMode === "dark" ? theme.colors.text : theme.colors.text;
  const { fontSize } = useSize();

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      color={textColor as ColorType}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextView;
