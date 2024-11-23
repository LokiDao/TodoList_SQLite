import TabContent from "@app/components/UI/TabContent"; // Assuming TabContent handles tabs
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import images from "assets/images";
import {
  Box,
  Center,
  Fab,
  FlatList,
  Icon,
  Image,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { Todo } from "../models";
import useMainViewModel from "../viewmodels/useMainViewModel";
import TodoItem from "./components/TodoItem";

const MainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "main">>();
  const [activeTab, setActiveTab] = useState("Ongoing");

  const {
    completedTodos,
    handleComplete,
    handleDelete,
    isLoading,
    ongoingTodos,
  } = useMainViewModel();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Todo List",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "white",
    });
  }, []);

  const renderTodoList = (filteredTodos: Todo[]) => {
    return isLoading ? (
      <Spinner size={"lg"} />
    ) : filteredTodos.length === 0 ? (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Center>
          <Image source={images.check_list_empty} size={"xl"} alt="Empty" />
        </Center>
        <Text color="white" fontSize="2xl" mt={4}>
          What do you want to do today?
        </Text>
        <Text color="gray.400" fontSize="md">
          Tap + to add your tasks
        </Text>
      </Box>
    ) : (
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onComplete={() => handleComplete(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
    );
  };

  const tabs = [
    {
      key: "Ongoing",
      title: "Ongoing",
      content: renderTodoList(ongoingTodos),
    },
    {
      key: "Completed",
      title: "Completed",
      content: renderTodoList(completedTodos),
    },
  ];

  return (
    <VStack flex={1} background={"black"} px={4}>
      <>
        <TabContent
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {route.name === "main" && (
          <Fab
            size="lg"
            colorScheme="violet"
            icon={<Icon color="white" as={<Ionicons name="add" />} size="md" />}
            onPress={() =>
              navigation.navigate("addTodo", { isEditMode: false })
            }
          />
        )}
      </>
    </VStack>
  );
};

export default MainScreen;
