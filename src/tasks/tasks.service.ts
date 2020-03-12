import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TaskDTO, FilterTaskDTO } from './dto/task.tdo'
import { uuid } from 'uuidv4';
import * as _ from "lodash";
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import * as util from 'util';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) throw new NotFoundException(`task with id ${id} not found`);

    return task;
  }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async createTask(task: TaskDTO): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    await newTask.save()
    return newTask;
  }

  async deleteTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`task with id ${id} not found`);

    await this.taskRepository.delete(id)
    return task;
  }

  async updateTaskById(id: number, task: TaskDTO): Promise<Task> {
    let _task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException(`task with id ${id} not found`);

    _task = _.assign(_task, task, task, {})
    await _task.save()

    return _task
  }
}
