import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: task,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask}/>

      <FlatList
        style={{ marginTop: 20 }}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              onPress={() => toggleTaskCompleted(item.id)}
              style={[
                styles.checkbox,
                item.completed && styles.checkboxChecked,
              ]}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleTaskCompleted(item.id)}
              style={{ flex: 1 }}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.taskTextCompleted,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <MaterialIcons name="delete" size={24} color="#B00020" />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Clear Completed Tasks" onPress={clearCompleted} />
    </View>
  );
}

const styles = StyleSheet.create({
  addTask: { marginTop: 20 },
  container: { padding: 20, marginTop: 50, flex: 1 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 20,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  taskText: {
    fontSize: 18,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  delete: {
    fontSize: 18,
    marginLeft: 12,
  },
});
