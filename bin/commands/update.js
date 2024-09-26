import { input } from "@inquirer/prompts"
import fs from "fs/promises"

export default async function UpdateTask() {
    const answer = await input({
        message: "please enter the id of the task you want to update: ",
    });
    if (!answer || answer == "exit") {
        return answer
    }

    if (isNaN(answer)) {
        console.log("id must be a number");
        return "";
    }

    let tasks = {};
    try {
        var data = await fs.readFile('tasks.json', 'utf8');
        tasks = JSON.parse(data);
        console.log("read success")
    } catch (err) {
        console.log("could not find any tasks");
        return "";
    }
    const updateName = await input({
        message: "please enter the new name of the task: "
    });

    if (!updateName) {
        return updateName
    }

    let taskFound = false;
    for(let i = 0; i < tasks.tasks.length; i++) {
        if(tasks.tasks[i].id == answer) {
            tasks.tasks[i].task = updateName
            tasks.tasks[i].updatedAt = new Date()
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