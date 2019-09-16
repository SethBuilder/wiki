import slugify from 'slugify';
import wtf from 'wtf_wikipedia';
import repl from 'repl';
import fetch from 'node-fetch';
import inquirer from 'inquirer';


export async function readArticle(options) {
    const lang = options.language;
    let replServer = repl.start({
        prompt: "wiki-reader > ",
        eval: function(i) { getFunc(i, lang) }
    });

}

function getFunc(input, lang) {

    let str = input.split(' ');
    
    if (str[0] == "READ") {
        str.shift();
        console.log(slugify(str.join('_')))
        callWiki(slugify(str.join('_')), lang);

    }
    else if (str[0].replace(/\n+/g, '') == "QUIT") {
        process.exit();
    }
    else if (str[0].replace(/\n+/g, '') == "HELP") {
        console.log('READ <article title>:    displays article one paragraph at a time');
        console.log('QUIT:    quits repl app');
        process.exit();
    }
}

function callWiki(slug, lang) {
    (async() => {
        let doc = await wtf.fetch(slug, lang)
        .then(res   =>  { return res.text().split(/\r?\n/).filter(n => n)})
        .catch(err  =>  {console.log('Not found, please try changing the language');process.exit()});
        

        prompt(doc);
    })();
}

var question = [{
    type: 'confirm',
    name: 'more',
    message: 'Read more?',
    default: false
}];

let prompt = function(txt, p = 0) {
    if (p == 0) {
        console.log(txt[0]);
    }
    return inquirer
        .prompt(question)
        .then(function(answer) {
            if (answer.more === true) {
                p += 1;
                console.log(txt[p]);
                return prompt(txt, p);
            }
            else {
                console.log('Thank you');
            }
        });
}