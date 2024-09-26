import { input } from "@inquirer/prompts"
import fs from "fs/promises"

export default async function deleteTask() {
    const answer = await input({
        message: "please enter the id of the task you want to delete: ",
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
        let data = await fs.readFile('tasks.json', 'utf8');
        tasks = JSON.parse(data);
        console.log("read success")
    } catch (err) {
        console.log("could not find any tasks");
        return "";
    }

    tasks.tasks = tasks.tasks.filter(task => task.id != answer);
    console.log("updated tasks: ",
        tasks
    )
    await fs.writeFile('tasks.json', JSON.stringify(tasks), err => {
        console.log(err)
    })
}