const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

app();

function app () {
    const files = getFiles();

    console.log('Please, write your command!');
    readLine(processCommand);
}

function getFiles () {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand (command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            show();
            break;
        case 'important':
            important ()
            break;
        case 'user {username}':
            user();
            break;
        case 'sort {type}':
            sort();
            break;
        case 'date {date}':
            date();
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function show (){
    console.log('show');
    const files = getFiles();

    let reg = /TODO/ig;   
    const regexp = RegExp('TODO','g');

    for(let str of files){       
        while ((matches = regexp.exec(str)) !== null) {
            console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`); 
        }
    }    
}


//TODO Отформатировать вывод, разобраться с выводом имени файла, реализовать сортировку и тд.


function important (){
    const files = getFiles();

    let reg = /TODO/ig;   
    const regexpTODO = RegExp('TODO(.*)','ig');
    const regexpImp = RegExp('!','g');
    const regexpForm = RegExp('TODO(.*);(.*);(.*)');
    let output;

    for(let str of files){
        while ((matches = regexpTODO.exec(str)) !== null){
            if(regexpImp.exec(matches[0]) !== null){
                output = "!    |    ";
            } else{
                output = "     |    ";
            }

            if((result = regexpForm.exec(matches[0])) !== null){
                output = output + result[1] + '   |' + result[2] + '   |' + result[3];
            } else{
                output = output + '|        |        |     ' + matches[1];
            }

            console.log(`${output}`);             
        }
    }


    // for(let str of files){
    //     while ((matches = regexpImp.exec(str)) !== null){
    //         output = "!    |    ";
    //         console.log(`${output} ${matches[0]}`);
    //     }
    // }

    // for(let str of files){       
    //     while ((matches = regexpTODO.exec(str)) !== null) {
    //         if(regexpImp.exec(matches[0])!== null){
    //             output = output + "!    |   ";
    //         }
            
    //         if((result = regexpForm.exec(matches[0]))!== null){
    //             output = output + '   ' + result[1] + '   |' + result[2] + '   |' + result[3];
    //         } else {
    //             output = output + '|        |        |     ';
    //         }

    //         console.log(output);
    //     }
    // }
}

function user (username){
    console.log('user');

}

function sort (type){
    console.log('sort');

}

function date (date){
    console.log('date');

}

// TODO you can do it!
