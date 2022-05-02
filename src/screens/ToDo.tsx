import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { Task } from '~/components/Task';

const initialTasks = [
  {
    title: 'Grab some Pizza',
    status: true,
  },
  {
    title: 'Do your workout',
    status: true,
  },
  {
    title: 'Hangout with friends',
    status: false,
  },
];

export const ToDo = (props: ViewProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [value, setValue] = useState('');

  function handleAddNewTask(title: string) {
    setTasks((prevState) => [...prevState, { title, status: false }]);
  }

  function handleSubmit() {
    if (!value) return;

    handleAddNewTask(value);
    setValue('');
  }

  function toggleTaskStatus(index: number) {
    const newTasks = [...tasks];
    newTasks[index].status = !newTasks[index].status;

    setTasks(newTasks);
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

      <SafeAreaView />
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
