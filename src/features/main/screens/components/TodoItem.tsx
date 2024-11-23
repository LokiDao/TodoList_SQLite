import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Checkbox,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Todo } from "../../models";
import { formatDueDate } from "../../utils/dateUtils";
import getDueDateStatus from "../../utils/getDueDateStatus";

interface TodoItemProps {
  item: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onComplete, onDelete }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleEdit = () => {
    navigation.navigate("addTodo", { todo: item, isEditMode: true });
  };

  // Get due date status and color
  const dueDateStatus = getDueDateStatus(item);
  const dueDateColor = dueDateStatus.includes("Overdue")
    ? "red.400"
    : "green.400";

  return (
    <Swipeable
      renderRightActions={() => (
        <HStack>
          {/* Swipe to edit */}
          <IconButton
            icon={<Ionicons name="pencil" size={24} color="blue" />}
            onPress={handleEdit}
          />
          {/* Swipe to delete */}
          <IconButton
            icon={<Ionicons name="trash" size={24} color="red" />}
            onPress={onDelete}
          />
        </HStack>
      )}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg="gray.800"
        p={4}
        mb={2}
        borderRadius="md"
      >
        <HStack space={4} alignItems="center">
          {/* Checkbox to mark task as complete */}
          <Checkbox
            isChecked={item.completed}
            onChange={onComplete}
            colorScheme="green"
            aria-label="Mark task as completed"
            value={item.title}
            _checked={{ bg: "green.500" }}
          />
          <VStack flex={1} alignItems={"flex-start"}>
            {/* Task title */}
            <HStack>
              <VStack w={"45%"}>
                <Text
                  color="white"
                  fontSize="lg"
                  bold
                  strikeThrough={item.completed}
                >
                  {item.title}
                </Text>
                <Text color="gray.400" numberOfLines={3}>
                  {item.description}
                </Text>
              </VStack>

              {/* Due date */}
              <VStack alignItems={"flex-end"}>
                {item.dueDate && (
                  <Text color="gray.400">{formatDueDate(item.dueDate)}</Text>
                )}
                {item.dueDate && (
                  <Text color={dueDateColor} fontSize="sm" mt={1}>
                    {dueDateStatus}
                  </Text>
                )}
              </VStack>
            </HStack>

            <Spacer />
          </VStack>
        </HStack>
      </HStack>
    </Swipeable>
  );
};

export default TodoItem;
