import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskDTO } from './dto/task.tdo'
import { uuid } from 'uuidv4';
import * as _ from "lodash";

@Injectable()
export class TasksService {
  private tasks = [];

  public getTasks() {
    return this.tasks;
  }

  public createTask(taskDTO: TaskDTO): Task {
    const task: Task = {
      id: uuid(),
      ...taskDTO,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: string): Task {
    const task = _.find(this.tasks, { id })
    return task;
  }

  public deleteTaskById(id: string): Task {
    const task = _.chain(this.tasks)
      .remove(task => task.id === id)
      .first()
      .value();
    return task;
  }

  public updateTaskById(id: string, taskDTO: TaskDTO): Task {
    const index = _.findIndex(this.tasks, { id })

    this.tasks[index] = {
      ...this.tasks[index],
      ...taskDTO
    }

    return this.tasks[index];
  }

  public replaceTaskById(id: string, taskDTO: TaskDTO): Task {
    const index = _.findIndex(this.tasks, { id })

    this.tasks[index] = {
      ...this.tasks[index],
      ...taskDTO
    }

    return this.tasks[index];
  }
}
