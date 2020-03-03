import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskDTO, FilterTaskDTO } from './dto/task.tdo'
import { uuid } from 'uuidv4';
import * as _ from "lodash";

@Injectable()
export class TasksService {
  private tasks = [];

  public getTasks(): Array<Task> {
    return this.tasks;
  }

  public getTasksByFilter(filterTaskDTO: FilterTaskDTO): Array<Task> {
    const { status, search } = filterTaskDTO;

    let tasks = this.tasks;

    if (status) {
      tasks = _.filter(this.tasks, { status })
    }

    const _search = _.chain(search).toLower().trim().value();
    if (search) {
      tasks = _.filter(tasks, task => {
        return _.chain(["title", "description"])
          .map(key => {
            return _.chain(task[key]).toLower().includes(_search).value()
          })
          .some()
          .value()
      })
    }

    return tasks;
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
