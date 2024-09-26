import { input } from "@inquirer/prompts"
import fs from "fs/promises"

export default async function mark(status) {
    const answer = await input({
        message: `please enter the id of the task you want to set as ${status}: `
    });
    if (!answer || answer == "exit") {
        return answer
    }

    if (isNaN(answer)) {
        console.log("id must be a number");
        return "";
    }

    let tasks = {};
    let taskFound = false;
    try {
        var data = await fs.readFile('tasks.json', 'utf8');
        tasks = JSON.parse(data);
        console.log("read success")
    } catch (err) {
        console.log("could not find any tasks");
        return "";
    }

    for (let i = 0; i < tasks.tasks.length; i++) {
        if (tasks.tasks[i].id == answer) {
            console.log(tasks.tasks[i])
            tasks.tasks[i] = { ...tasks.tasks[i], status: status, updatedAt: new Date() }
            taskFound = true
            break
        }
    }

    if (!taskFound) {
        console.log("task not found")
        return ""
    }

    console.log("updated tasks: ",
        tasks
    )
    await fs.writeFile('tasks.json', JSON.stringify(tasks), err => {
        console.log(err)
    })
}