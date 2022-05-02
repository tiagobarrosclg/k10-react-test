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

const initialTasks = [
  {
    title: 'Grab some Pizza',
    completed: true,
  },
  {
    title: 'Do your workout',
    completed: true,
  },
  {
    title: 'Hangout with friends',
    completed: false,
  },
];

type TaskProps = {
  task: {
    title: string;
    completed: boolean;
  };
  index: number;
  onCompleted(index: number): void;
};

function Task({ task, index, onCompleted }: TaskProps) {
  return (
    <View style={styles.task}>
      <View style={styles.taskTitle}>
        <Text>💡</Text>

        <Text
          style={{
            textDecorationLine: task.completed ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.toggleTaskButton}
        activeOpacity={0.6}
        onPress={() => onCompleted(index)}
      >
        <Text style={{ color: '#fff' }}>
          {task.completed ? 'Undone' : 'Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export const ToDo = (props: ViewProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) return;

    addTask(value);
    setValue('');
  };

  const addTask = (title: string) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <View style={styles.container} {...props}>
      <SafeAreaView />

      <View style={{ alignItems: 'center', width: '100%' }}>
        <TextInput
          style={{
            backgroundColor: '#ffffff',
            padding: 10,
            color: '#000000',
            width: '90%',
          }}
          value={value}
          placeholder="Add a new task"
          placeholderTextColor="#444"
          onChangeText={(event) => setValue(event)}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <View
        style={{
          backgroundColor: '#333',
          width: '90%',
          height: 1,
          marginVertical: 8,
        }}
      />

      <FlatList
        style={styles.contentScroll}
        data={tasks}
        renderItem={({ item, index }) => (
          <Task onCompleted={completeTask} task={item} index={index} />
        )}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          padding: 20,

          flexDirection: 'row',
          justifyContent: 'center',

          width: '100%',
        }}
      >
        <TouchableOpacity
          style={styles.addNewTaskButton}
          activeOpacity={0.6}
          onPress={handleSubmit}
        >
          <Text>Add new To Do</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#eee',
    alignItems: 'center',
  },
  contentScroll: {
    width: '90%',
  },
  content: {},
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addNewTaskButton: {
    backgroundColor: '#27ec92',

    paddingHorizontal: 24,
    paddingVertical: 12,

    borderRadius: 8,
    marginBottom: 8,
  },
  toggleTaskButton: {
    backgroundColor: '#3b6de3',

    width: 100,

    alignItems: 'center',

    paddingHorizontal: 24,
    paddingVertical: 12,

    borderRadius: 8,
    marginBottom: 8,
  },
});
