//import './taskTracker.css';

import Column from '../components/column';
import Header from '../components/Header';
import Home from '../components/CompHome';
import SubTask from '../components/Subtask';
import Task from '../components/Task';


const TaskTracker = () => {
    return (
        <div>
            <div className='taskTracker'>

                <div className='task__header'>
                    <Header />
                </div>
                <div className=''>
                    <div className='taskTracker__column'>
                        <Column />
                    </div>
                    <div className=''>
                        <div className='taskTracker__subtask'>
                            <SubTask />
                        </div>
                        <div className='taskTracker__right'>
                            <div className='taskTracker__addtask'>
                                <Home />
                            </div>
                            <div className='task'>
                                <Task />
                            </div>
                            <div className='taskTracker__tasklist'>
                                <TaskList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskTracker;