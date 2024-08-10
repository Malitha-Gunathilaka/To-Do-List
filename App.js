import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (taskKey) => {
    setTasks(tasks.map(task => 
      task.key === taskKey ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskKey) => {
    setTasks(tasks.filter(task => task.key !== taskKey));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // 'all' filter
  });

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Advanced To-Do List</Text>
        <TouchableOpacity 
          style={styles.toggleButton} 
          onPress={() => setIsDarkMode(!isDarkMode)}
        >
          <FontAwesome 
            name={isDarkMode ? 'sun-o' : 'moon-o'} 
            size={24} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      </View>
      <TextInput 
        placeholder="Enter a task" 
        style={styles.input} 
        onChangeText={setTask} 
        value={task} 
      />
      <Button title="Add Task" onPress={addTask} />
      
      <View style={styles.filters}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="Completed" onPress={() => setFilter('completed')} />
        <Button title="Incomplete" onPress={() => setFilter('incomplete')} />
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity 
              onPress={() => toggleTaskCompletion(item.key)} 
              style={{ ...styles.task, backgroundColor: item.completed ? styles.completedBackground : styles.incompleteBackground }}
            >
              <Text style={item.completed ? styles.completedTask : styles.taskText}>{item.value}</Text>
            </TouchableOpacity>
            <Button title="Delete" color="red" onPress={() => deleteTask(item.key)} />
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Malitha</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Malitha-Gunathilaka')}>
          <FontAwesome name="github" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}

const getStyles = (isDarkMode) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDarkMode ? '#fff' : '#000',
    },
    input: {
      borderBottomColor: isDarkMode ? '#bbb' : '#ccc',
      borderBottomWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 8,
      paddingVertical: 5,
      width: '100%',
      color: isDarkMode ? '#fff' : '#000',
    },
    filters: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginVertical: 10,
    },
    taskContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 10,
      borderColor: isDarkMode ? '#bbb' : '#ccc',
      borderWidth: 1,
      marginTop: 10,
    },
    task: {
      flex: 1,
      padding: 10,
      fontSize: 18,
      borderColor: isDarkMode ? '#bbb' : '#ccc',
      borderWidth: 1,
      marginRight: 10,
    },
    taskText: {
      fontSize: 18,
      color: isDarkMode ? '#fff' : '#000',
    },
    completedTask: {
      fontSize: 18,
      textDecorationLine: 'line-through',
      color: '#888',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 14,
      marginRight: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    completedBackground: {
      backgroundColor: '#d1ffd1',
    },
    incompleteBackground: {
      backgroundColor: '#fff',
    },
    toggleButton: {
      marginLeft: 10,
    },
  });
};
