import React from "react";
import { useDispatch, useSelector } from "react-redux";
import boardTaskSlice from "../redux/boardtaskslice";

function Subtask({ index, taskIndex }) {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.columns);
  const column = columns.find((column) => column.isActive === true);
  const task = column.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = (e) => {
    dispatch(
      boardTaskSlice.actions.setSubtaskCompleted({ index, taskIndex })
    );
  };

  return (
    <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <input
        className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={checked && " line-through opacity-30 "}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;