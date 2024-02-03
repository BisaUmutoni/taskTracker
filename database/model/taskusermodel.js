const mongoose = require('mongoose');

const taskSchema = mongoose.Schema( {

        columns: [
          {
            tasks: [
                    { type: String,
                        title: "",
                        description: "",
                        status: { type: stringify,
                        enum: ["backlog", "todo", "doing", "done"],
                        default: 'backlog'},
                        subtasks: [ 
                                    { title: "", isCompleted: true },
                                    { title: "", isCompleted: false }
                                  ]
                    }
                    ],
            createdBy : {
			                type: mongoose.Schema.Types.ObjectId,
			                ref: 'user',
		                },
	        }],
        
    },
	{ timestamp: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
              
      // ... (other boards)

  //return (
    // <div> {data.boards.map(board => (
        <div key={board.name}>
          <h2>{board.name}</h2>
          {board.columns.map(column => (
            <div key={column.name}>
              <h3>{column.name}</h3>
              {column.tasks.map(task => (
                <div key={task.title}>
                  <p>{task.title}</p>
                  {/* ... (render other task details) */}
                  {task.subtasks.map(subtask => (
                    <div key={subtask.title}>
                      <p>{subtask.title}</p>
                      {/* ... (render other subtask details) */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}   </div>

