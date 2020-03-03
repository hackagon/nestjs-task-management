import { TaskStatus } from '../task.model'

export class TaskDTO {
    title: string;
    description: string;
    status?: TaskStatus
}

export class FilterTaskDTO {
    status: TaskStatus;
    search: string;   
}