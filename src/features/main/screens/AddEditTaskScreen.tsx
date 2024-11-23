import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, HStack, IconButton, Input, Text, VStack } from "native-base";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { addTodo, editTodo } from "@app/features/main/slices"; // Add updateTodo action
import { RootStackParams } from "@app/navigations/types/RootStackParams.type";
import { useAppDispatch } from "@app/stores";
import { showDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import {
  addTodoSqlite,
  getDBConnection,
  updateTodoSqlite,
} from "@app/utils/database";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const route = useRoute<RouteProp<RootStackParams, "addTodo">>();
  const task = route.params?.todo;
  const isEditMode = route.params?.isEditMode ?? false;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Task" : "Add Task",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white",
    });
  }, [isEditMode]);

  // Pre-fill fields in edit mode
  useEffect(() => {
    if (isEditMode && task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      if (task.dueDate) {
        setDueDate(task.dueDate);
        setDueTime(task.dueDate);
      }
    } else {
      setTitle("");
      setDescription("");
      setDueDate(null);
      setDueTime(null);
    }
  }, [isEditMode, task]);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    console.log(selectedDate);
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDueTime(selectedTime);
    }
  };

  const combineDateAndTime = () => {
    if (!dueDate) return null;
    const combined = new Date(dueDate);
    if (dueTime) {
      combined.setHours(dueTime.getHours());
      combined.setMinutes(dueTime.getMinutes());
    }

    return combined;
  };
  const handleAddOrUpdateTask = async () => {
    const finalDueDate = combineDateAndTime();
    const currentDate = new Date();
    const db = await getDBConnection();

    // Validate if due date and time are in the future
    if (finalDueDate && finalDueDate < currentDate) {
      dispatch(
        showDialog({
          title: "Error",
          content: "Due date and time cannot be in the past.",
          type: DialogType.WARNING,
        }),
      );
      return;
    }

    if (title.trim() === "") {
      dispatch(
        showDialog({
          title: "Error",
          content: "Title cannot be empty.",
          type: DialogType.WARNING,
        }),
      );
      return;
    }

    if (isEditMode && task) {
      // Update existing task
      dispatch(
        editTodo({
          ...task,
          title,
          description,
          dueDate: finalDueDate as Date,
        }),
      );

      await updateTodoSqlite(db, {
        ...task,
        title,
        description,
        dueDate: finalDueDate as Date,
      });
    } else {
      // Add new task
      dispatch(addTodo({ title, description, dueDate: finalDueDate as Date }));
      // Add new task to SQLite
      await addTodoSqlite(db, {
        title,
        description,
        dueDate: finalDueDate as Date,
        completed: false,
      });
    }
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <VStack flex={1} p={4} bg="black" space={4}>
        {/* Task Title Input */}
        <Input
          placeholder="Task Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="gray.500"
          color="white"
          mb={4}
          bg="gray.800"
        />

        {/* Task Description Input */}
        <Input
          placeholder="Task Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="gray.500"
          color="white"
          mb={4}
          bg="gray.800"
        />

        {/* Date Picker Section */}
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Text color="white" fontSize="md">
            {dueDate ? dueDate.toLocaleDateString() : "Pick a Due Date"}
          </Text>
          <IconButton
            icon={<Ionicons name="calendar" size={24} color="white" />}
            onPress={() => setShowDatePicker(true)}
          />
        </HStack>

        {/* Show Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
            style={styles.dateTimePicker}
            minimumDate={new Date()}
            accentColor="purple"
          />
        )}

        {/* Time Picker Section */}
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Text color="white" fontSize="md">
            {dueTime ? dueTime.toLocaleTimeString() : "Pick a Time"}
          </Text>
          <IconButton
            icon={<Ionicons name="time" size={24} color="white" />}
            onPress={() => setShowTimePicker(true)}
          />
        </HStack>

        {/* Show Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={dueTime || new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
            accentColor="purple"
            minimumDate={new Date()}
          />
        )}

        {/* Add/Update Task Button */}
        <Button
          colorScheme="violet"
          _text={{ color: "white" }}
          onPress={handleAddOrUpdateTask}
        >
          {isEditMode ? "Update Task" : "Add Task"}
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dateTimePicker: {
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#C5C5C5",
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
  },
});

export default AddTaskScreen;
