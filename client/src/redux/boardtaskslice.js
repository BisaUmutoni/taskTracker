import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialTask = localStorage.getItem('taskboard')
 ?JSON.parse(localStorage.getItem('taskboard')):null;

 const initialState ={ 
  TaskData: initialTask,
  AllTasks: {}
 }

const boardTaskSlice = createSlice({
  name: "task",
  initialState, 

  reducers: {

    ColumnTaskadd: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const column = {
        name: payload.name,
        isActive,
        tasks: [],
      };
      column.tasks = payload.newColumns;
      state.push(column);
    },
    editColumnTask: (state, action) => {
      const payload = action.payload;
      const column = state.find((column) => column.isActive);
      column.name = payload.name;
      column.tasks = payload.newTasks;
    },
    deleteColumnTask: (state) => {
      const column = state.find((column) => column.isActive);
      state.splice(state.indexOf(column), 1);
    },
    setColumnTaskActive: (state, action) => {
      state.map((column, index) => {
        index === action.payload.index
          ? (column.isActive = true)
          : (column.isActive = false);
        return column;
      });
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const column = state.columns.find((col, index) => index === newColIndex);
      column.task.push(task);
    },
    taskAddFailure: (state) => { return state},

    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;

      const column = state.columns.find((col, index) => column.isActive, index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;
      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = task.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const columns = state.find((columns) => columns.isActive);
      const prevCol = columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const col = state.columns.find((col, i) => columns.isActive, i === payload.colIndex);
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, i) => i === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },
    subtaskAddfail: (state) => { return state},

    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const columns = state.columns.find((columns) => columns.isActive);
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasks.find((task, i) => i === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const columns = state.find((columns) => columns.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
    deleteTaskfail: (state) => {return state},

  },
});

export default boardTaskSlice;

export const  addTask = (task, id) => async (dispatch) => {

  const taskData = {task, id};
  const response = await axios.post('http://localhost:4000/task/add', taskData);
  if (response) {
    localStorage.setItem('task', JSON.stringify(response.data));
  
    dispatch(addTask (response.data));
    toast.success('task added successfully');
    window.location.reload();
  } else {
    dispatch(taskAddFailure());
  }
}

export const getAllTasks = (token, id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  try {
    const response = await axios.get(
      'http://localhost:4000/task/tasks',
      config
    );

    if (response) {
      dispatch(addTask(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      dispatch(taskAddFailure());
    }
  }
};

// try {
//   const response = await axios.get(
//     'http://localhost:4000/task/tasks',
//     config
//   );

//   if (response) {
//     dispatch(setSubtaskCompleted(response.data));
//   }
// } catch (error) {
//   if (error.response.status === 400) {
//     dispatch(getAllTaskFailure());
//   }
// }


export const arrowClick = (item, string) => async () => {
let taskData = {
  id: item._id,
  status: item.status,
  string,
};

try {
  let response = await axios.put(
    `http://localhost:4000/task/${taskData.id}`,
    taskData
  );

  if (response) {
    window.location.reload();
  }
} catch (error) {
  console.log(error);
}
};

export const deleteItem = (id) => async (dispatch) => {
let res = await axios.delete(`http://localhost:4000/task/${id}`);

if (res) {
  dispatch(deleteTask());
  toast.success('task deleted successfully');

  window.location.reload();
} else {
  dispatch(deleteTaskfail());
}
};