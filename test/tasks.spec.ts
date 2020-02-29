import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksController', () => {
    let tasksController: TasksController;
    let tasksService: TasksService;

    beforeEach(() => {
        tasksService = new TasksService();
        tasksController = new TasksController(tasksService);
    });
}); 