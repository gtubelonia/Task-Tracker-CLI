import { rawlist } from "@inquirer/prompts"
import fs from "fs/promises"

export default async function list() {
    let filter = await rawlist({
        message: "Select a command: ",
        choices: ["all", "done", "InProgress", "exit"],
    })
    if (filter == "exit") {
        return filter
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

    console.log(`tasks: ${filter}`)
    for (let i = 0; i < tasks.tasks.length; i++) {
        if (filter == "all") {
            console.log(tasks.tasks[i])
        } else {
            if (tasks.tasks[i].status == filter) {
                console.log(tasks.tasks[i])
            }
        }
    }

    await fs.writeFile('tasks.json', JSON.stringify(tasks), err => {
        console.log(err)
    })
}