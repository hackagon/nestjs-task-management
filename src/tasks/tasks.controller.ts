import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { TaskDTO, FilterTaskDTO } from './dto/task.tdo';
import * as _ from "lodash";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterTaskDTO: FilterTaskDTO): Promise<Task[]> {
    // if (_.isEmpty(filterTaskDTO)) return this.tasksService.getTasks();
    // return this.tasksService.getTasksByFilter(filterTaskDTO);
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() taskDTO: TaskDTO): Promise<Task> {
    return this.tasksService.createTask(taskDTO);
  }

  @Get("/:id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete(":id")
  deleteTaskById(@Param("id") id: number): Promise<Task> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch(":id")
  updateTaskById(@Param("id", ParseIntPipe) id: number, @Body() taskDTO: TaskDTO): Promise<Task> {
    return this.tasksService.updateTaskById(id, taskDTO);
  }
}
