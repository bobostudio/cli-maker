#!/usr/bin/env node
// console.log('create-smarty ....')
// import { promisify } from 'util'
import figlet from 'figlet'
import clear from 'clear'
import chalkAnimation from 'chalk-animation'
// import chalk from 'chalk'
import inquirer from 'inquirer'

// const log = (content) => console.log(chalk.greenBright(content));

let options = {
    "react-template": "react-template",
    "quit": "quit",
}

clear()
const logo = figlet.textSync("Cli Maker", {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
})

const main = chalkAnimation.rainbow(logo);
setTimeout(() => {
    main.stop();
    query();
}, 1000)

async function query() {
    const answer = await inquirer.prompt([
        {
            type: 'rawlist',
            message: '请选择要创建的项目？',
            name: 'oper',
            choices: Object.keys(options)
        }
    ])
    if (answer.oper === '退出') process.exit();
    const { default: op } = await import(`../lib/oper/${answer.oper}.js`)
    await op();
}
