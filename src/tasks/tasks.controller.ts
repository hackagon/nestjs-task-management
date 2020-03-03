import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskDTO, FilterTaskDTO } from './dto/task.tdo';
import * as _ from "lodash";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterTaskDTO: FilterTaskDTO): Array<Task> {
    if (_.isEmpty(filterTaskDTO)) return this.tasksService.getTasks();
    return this.tasksService.getTasksByFilter(filterTaskDTO);
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
