import arg from 'arg';
import figlet from 'figlet';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { readArticle } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
            {},
            {
                argv: rawArgs.slice(1),
            }
        );
        return {
           language: args._[1],
         };
}

async function promptForMissingOptions(options) {
 const defaultLanguage = 'English';
 const questions = [];
 const languages = {'English':  'en', 'French':  'fr', 'Spanish':  'es', 'Arabic':  'ar'};
 
 if (!options.language || !Object.keys(languages).includes(options.language)) {
   questions.push({
     type: 'list',
     name: 'language',
     message: 'Please choose language',
     choices: Object.keys(languages),
     default: defaultLanguage,
   });
 }

 const answers = await inquirer.prompt(questions);
 return {
   ...options,
   language: languages[options.language] || languages[answers.language],
 };
}


export async function cli(args) {
    console.log(
        chalk.red(
            figlet.textSync('Seif\'s Wiki Reader', { horizontalLayout: 'full' })
            )
  );
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    
    await readArticle(options);
}