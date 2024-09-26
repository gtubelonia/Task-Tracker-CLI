#!/usr/bin/env node

import { rawlist } from '@inquirer/prompts';
import add from './commands/add.js'
import update from './commands/update.js';
import deleteTask from './commands/delete.js';
import list from './commands/list.js';
import mark from './commands/mark.js';
var exit = false;
while (!exit) {
    const input = await awaitInput();
    switch (input) {
        case "add":
            await add();
            break;
        case "update":
            await update();
            break;
        case "delete":
            await deleteTask();
            break;
        case "mark-in-progress":
            await mark('InProgress');
            break;
        case "mark-done":
            await mark('done');
            break;
        case "list":
            await list();
            break;
        case "exit":
            exit = true;
            break;
    }
}
async function awaitInput() {
    const answer = await rawlist({
        message: "Select a command: ",
        choices: ["add", "update", "delete", "mark-in-progress", "mark-done", "list", "exit"],
    })
    return answer
}