import { useState, useRef, useEffect, useReducer } from "react";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import tasksReducer from './reducers/tasksReducer.js'

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, dispatch] = useReducer(tasksReducer, props.tasks);
  const [filter, setFilter] = useState("All");

  // Task Actions
  function editTask(id, newName) {
    dispatch({
      type: 'edited',
      id,
      newName,
    }); 
  }
  
  function deleteTask(id) {
    dispatch({
      type: 'deleted',
      id,
    });  
  }
  

  function addTask(name) {
    dispatch({
      type: 'added',
      name,
    });
  }

    

  function toggleTaskCompleted(id) {
    dispatch({
      type: 'toggled',
      id,
    });
  }
  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* <Form onSubmit={addTask}/> */}
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {/* <FilterButton />
        <FilterButton />
        <FilterButton /> */}
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
