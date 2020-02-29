import { TaskStatus } from '../task.model'

export class TaskDTO {
    title: string;
    description: string;
    status?: TaskStatus
}

