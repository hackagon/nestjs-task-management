import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.tdo'
import { uuid } from 'uuidv4';
import * as _ from "lodash";

@Injectable()
export class TasksService {
  private tasks = [];

  public getTasks() {
    return this.tasks;
  }

  public createTask(createTaskDTO: CreateTaskDTO): Task {
    const task: Task = {
      id: uuid(),
      ...createTaskDTO,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }



  public getTaskById(id: string): Task {
    const task = _.find(this.tasks, { id })
    return task;
  }
}
