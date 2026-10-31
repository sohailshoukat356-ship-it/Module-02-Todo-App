
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { useTasks } from "@/components/tasks-context";

const categories = [
  { name: "Study", icon: "📚" },
  { name: "Work", icon: "💼" },
  { name: "Personal", icon: "👤" },
];

export default function AddTaskScreen() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Study");

  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    addTask(task.trim(), category);

    alert("Task added successfully!");

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task 📝</Text>

      <Text style={styles.label}>Task Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your task..."
        value={task}
        onChangeText={setTask}
      />

      <Text style={styles.label}>Select Category</Text>

      <View style={styles.categories}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={[
              styles.categoryButton,
              category === item.name && styles.selectedCategory,
            ]}
            onPress={() => setCategory(item.name)}
          >
            <Text
              style={[
                styles.categoryText,
                category === item.name && styles.selectedText,
              ]}
            >
              {item.icon} {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addText}>+ Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
    paddingTop: 70,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8A1538",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  categories: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#8A1538",
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
  },
  selectedText: {
    color: "white",
  },
  addButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  addText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  backText: {
    color: "#8A1538",
    fontWeight: "bold",
  },
});
