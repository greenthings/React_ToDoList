import { nanoid } from "nanoid";

function tasksReducer(tasks, action) {
    switch(action.type) {
        case 'added': {
            const newTask = { id:  `todo-${nanoid()}`, name: action.name, completed: false };
            return [
                ...tasks,
                newTask
            ];
        }

        case 'edited': {
            const editedTaskList = tasks.map((task) => {
                // if this task has the same ID as the edited task
                if (action.id === task.id) {
                  // Copy the task and update its name
                  return { ...task, name: action.newName };
                }
                // Return the original task if it's not the edited task
                return task;
            });

            return editedTaskList;
        }

        case 'deleted': {
            const remainingTasks = tasks.filter((task) => action.id !== task.id);

            return remainingTasks;
        }

        case 'toggled': {
            const updatedTasks = tasks.map((task) => {
                // if this task has the same ID as the edited task
                if (action.id === task.id) {
                  // use object spread to make a new object
                  // whose `completed` prop has been inverted
                  return { ...task, completed: !task.completed };
                }
                return task;
              });

              return updatedTasks;
        }

        default: {
            throw Error('Unknown Action' + action.type);
        }
    }

}

export default tasksReducer;