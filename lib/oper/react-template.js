import clone from '../clone.js'
import inquirer from 'inquirer'
import fs from 'fs'
import chalk from 'chalk'
import handlebars from "handlebars";

const log = (...args) => console.log(chalk.greenBright(...args))

export default async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input" /* 选择框 */,
            message: "请输入项目的名称？",
            name: "name",
        },
    ]);

    log("💡 创建项目:" + name);

    if (!name) {
        log('项目不能为空');
        return;
    }

    await clone("direct:https://github.com/BB-Code/react-template/archive/refs/heads/main.zip", name);

    compile(
        {
            name,
        },
        `./${name}/package.json`,
        `./template/package.hbs.json`
    );

    log(`
  👌 安装完成：
  To get Start:
  ===========================
  cd ${name}
  npm i
  npm run dev
  ===========================
              `);
};

function compile(meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
        let content = fs.readFileSync(templatePath).toString();
        const result = handlebars.compile(content)(meta);
        fs.writeFileSync(filePath, result);
        log(`✅ ${filePath} 修改成功`);
    } else {
        log(`❌ ${filePath} 修改失败`);
    }
}