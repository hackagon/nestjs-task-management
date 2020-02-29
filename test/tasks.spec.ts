import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksController', () => {
    let tasksController: TasksController;
    let tasksService: TasksService;

    beforeEach(() => {
        tasksService = new TasksService();
        tasksController = new TasksController(tasksService);
    });

    // describe('findAll', () => {
    //     it('should return an array of cats', async () => {
    //         const result = ['test'];
    //         jest.spyOn(tasksService, 'findAll').mockImplementation(() => result);

    //         expect(await TasksController.findAll()).toBe(result);
    //     });
    // });
});