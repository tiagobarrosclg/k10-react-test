import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

type TaskProps = ViewProps & {
  task: {
    title: string;
    status: boolean;
  };
  index: number;
  action(index: number): void;
};

export const Task = ({ task, index, action, ...rest }: TaskProps) => {
  return (
    <View style={styles.task} {...rest}>
      <View style={styles.taskTitle}>
        <Text>💡</Text>

        <Text
          style={{
            textDecorationLine: task.status ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.toggleTaskButton}
        activeOpacity={0.6}
        onPress={() => action(index)}
      >
        <Text style={{ color: '#fff' }}>{task.status ? 'Undone' : 'Done'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flexDirection: 'row',
    alignItems: 'center',
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
