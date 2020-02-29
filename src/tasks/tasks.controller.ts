import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskDTO } from './dto/task.tdo';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(): Array<Task> {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() taskDTO: TaskDTO): Task {
    return this.tasksService.createTask(taskDTO);
  }

  @Get(":id")
  getTaskById(@Param("id") id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(":id")
  deleteTaskById(@Param("id") id: string): Task {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(":id")
  updateTaskById(@Param("id") id: string, @Body() taskDTO: TaskDTO): Task {
    return this.tasksService.updateTaskById(id, taskDTO);
  }
}
