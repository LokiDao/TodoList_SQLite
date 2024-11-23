import useSize from "@app/hooks/useSize";
import { Box, Button, HStack, ScrollView, Spacer, View } from "native-base";
import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

type TabContentProps = {
  tabs: { key: string; title: string; content: React.ReactNode }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScrollView?: boolean;
};

const TabContent: React.FC<TabContentProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  isScrollView = false,
}) => {
  const tabWidths = useRef<number[]>([]).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const borderWidth = useRef(new Animated.Value(0)).current;
  const borderColor = useRef(new Animated.Value(0)).current;
  const { fontSize } = useSize();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(borderWidth, {
      toValue: 2,
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(borderColor, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [activeTab]);

  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "violet"],
  });

  return (
    <Box flex={1}>
      {isScrollView ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <HStack alignItems="center" justifyContent="space-evenly">
            {tabs.map((tab, index) => (
              <View
                maxWidth={400}
                minWidth={100}
                key={tab.key}
                onLayout={(event) => {
                  const { width } = event.nativeEvent.layout;
                  tabWidths[index] = width;
                }}
              >
                <Button
                  variant="unstyled"
                  onPress={() => {
                    if (activeTab !== tab.key) {
                      opacity.setValue(0);
                      borderWidth.setValue(0);
                      borderColor.setValue(0);
                      setActiveTab(tab.key);
                    }
                  }}
                  _text={{
                    color: activeTab === tab.key ? "purple.500" : "gray.500",
                    fontWeight: "bold",
                    fontSize: fontSize,
                    textAlign: "center",
                  }}
                >
                  {tab.title}
                </Button>
                {activeTab === tab.key && (
                  <Animated.View
                    style={[
                      styles.animatedBorder,
                      {
                        borderBottomWidth: borderWidth,
                        borderBottomColor: animatedBorderColor,
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </HStack>
        </ScrollView>
      ) : (
        <HStack
          alignItems="center"
          width={"100%"}
          justifyContent="space-evenly"
        >
          {tabs.map((tab) => (
            <View flex={1} key={tab.key}>
              <Spacer />
              <Button
                variant="unstyled"
                onPress={() => {
                  if (activeTab !== tab.key) {
                    opacity.setValue(0);
                    borderWidth.setValue(0);
                    borderColor.setValue(0);
                    setActiveTab(tab.key);
                  }
                }}
                _text={{
                  color: activeTab === tab.key ? "purple.500" : "gray.500",
                  fontWeight: "bold",
                  fontSize: fontSize,
                  textAlign: "center",
                }}
              >
                {tab.title}
              </Button>
              {activeTab === tab.key && (
                <Animated.View
                  style={[
                    styles.animatedBorder,
                    {
                      borderBottomWidth: borderWidth,
                      borderBottomColor: animatedBorderColor,
                    },
                  ]}
                />
              )}
              <Spacer />
            </View>
          ))}
        </HStack>
      )}

      <View style={styles.content}>
        {tabs.map((tab) => (
          <Animated.View
            key={tab.key}
            style={{
              flex: 1,
              opacity: activeTab === tab.key ? opacity : 0,
              display: activeTab === tab.key ? "flex" : "none",
            }}
          >
            {tab.content}
          </Animated.View>
        ))}
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    flex: 1,
  },
  animatedBorder: {
    height: 2,
    width: "100%",
  },
});

export default memo(TabContent);
