
import { router } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { useTasks } from "@/components/tasks-context";

const categoryList = [
  { name: "Study", icon: "📚" },
  { name: "Work", icon: "💼" },
  { name: "Personal", icon: "👤" },
];

export default function Index() {
  const { tasks, deleteTask } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My To-Do App 📝</Text>

      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.logo}
      />

      <Text style={styles.subtitle}>
        Manage your daily tasks
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-task")}
      >
        <Text style={styles.addText}>
          + Add New Task
        </Text>
      </TouchableOpacity>

      <Text style={styles.section}>
        My Tasks ({tasks.length})
      </Text>

      <ScrollView>
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task!
          </Text>
        ) : (
          tasks.map((item) => (
            <View style={styles.card} key={item.id}>
              <View style={styles.taskDetails}>
                <Text style={styles.taskText}>
                  {item.title}
                </Text>

                <Text style={styles.taskCategory}>
                  {categoryList.find(
                    (cat) => cat.name === item.category
                  )?.icon} {item.category}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.delete}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#8A1538",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginVertical: 15,
  },
  subtitle: {
    color: "#666",
    marginBottom: 25,
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
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 12,
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 25,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDetails: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskCategory: {
    color: "#666",
    marginTop: 5,
  },
  delete: {
    color: "red",
    fontWeight: "bold",
    padding: 5,
  },
});
