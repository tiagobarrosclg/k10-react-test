import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task } from '~/components/Task';

type Task = {
  title: string;
  status: boolean;
};

export const ToDo = (props: ViewProps) => {
  const [tasks, setTasks] = useState<Task[]>([] as Task[]);
  const [value, setValue] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const cachedTasks = await SecureStore.getItemAsync('tasks');

      if (!cachedTasks) return;

      setTasks(JSON.parse(cachedTasks));
    }

    loadTasks();
  }, []);

  async function handleAddNewTask(title: string) {
    setTasks((prevState) => {
      const taskToReturn = [...prevState, { title, status: false }];

      async function handleSaveTasks() {
        await SecureStore.setItemAsync('tasks', JSON.stringify(taskToReturn));
      }

      handleSaveTasks();

      return taskToReturn;
    });
  }

  function handleSubmit() {
    if (!value) return;

    handleAddNewTask(value);
    setValue('');
  }

  function toggleTaskStatus(index: number) {
    setTasks((prevState) => {
      prevState[index].status = !prevState[index].status;

      return [...prevState];
    });
  }

  return (
    <View style={styles.container} {...props}>
      <SafeAreaView />

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={(event) => setValue(event)}
          placeholder="Add a new task"
          placeholderTextColor="#444"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          style={styles.input}
        />
      </View>

      <View style={styles.divider} />

      <FlatList
        style={styles.contentScroll}
        data={tasks}
        renderItem={({ item, index }) => (
          <Task action={toggleTaskStatus} task={item} index={index} />
        )}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            <Text>The task list is empty, add a new task to start!</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleSubmit}
          style={styles.addNewTaskButton}
        >
          <Text style={styles.textButton}>Add new To Do</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',

    backgroundColor: '#eee',
  },
  inputContainer: {
    alignItems: 'center',

    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',

    color: '#000000',

    padding: 10,

    width: '90%',
  },
  divider: {
    backgroundColor: '#333',

    width: '90%',
    height: 1,

    marginVertical: 8,
  },
  emptyListContainer: {
    alignItems: 'center',

    marginTop: 14,
  },
  keyboardContainer: {
    padding: 20,

    flexDirection: 'row',
    justifyContent: 'center',

    width: '100%',
  },
  textButton: {
    fontWeight: '600',

    color: '#222',
  },
  contentScroll: {
    width: '90%',
  },
  addNewTaskButton: {
    backgroundColor: '#27ec92',

    paddingHorizontal: 24,
    paddingVertical: 12,

    borderRadius: 8,

    marginBottom: 8,
  },
});
