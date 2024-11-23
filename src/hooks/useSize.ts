// constants.ts
import { useBreakpointValue } from "native-base";

const useSize = (): { iconSize: string; fontSize: string } => {
  const iconSize =
    useBreakpointValue({
      base: "sm",
      md: "md",
      lg: "lg",
    }) || "sm";

  const fontSize =
    useBreakpointValue({
      base: "sm",
      md: "md",
      lg: "lg",
    }) || "sm";

  return { iconSize, fontSize };
};

export default useSize;
