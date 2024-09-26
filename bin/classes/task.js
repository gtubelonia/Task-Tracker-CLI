export default class Task {
    constructor(task, id) {
        this.task = task
        this.id = id
        this.CreatedAt = new Date()
        this.status = ""
    }
}