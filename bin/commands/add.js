import { input } from "@inquirer/prompts"
import fs from "fs/promises"
import Task from "../classes/task.js"

export default async function CreateTask() {
    const answer = await input({
        message: "please enter a new task: ",
    })

    if (!answer || answer == "exit") {
        return answer
    }

    let tasks = {};
    try {
        var data = await fs.readFile('tasks.json', 'utf8');
        tasks = JSON.parse(data);
        console.log("read success")
    } catch (err) {
        console.log("no tasks found")
        tasks = {
            tasks: [],
            count: 0
        }
    }
    console.log(tasks)
    let newTask = new Task(answer, tasks.count + 1);

    tasks.tasks.push(newTask);
    tasks.count++;

    await fs.writeFile('tasks.json', JSON.stringify(tasks), err => {
        console.log(err)
    });

    console.log(tasks)
    return answer
}