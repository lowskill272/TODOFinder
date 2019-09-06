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
    reg = /user (.*)/i;
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
        case reg.exec(command)[0]:
            user(reg.exec(command)[1]);
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
    const files = getFiles();

    const regexpTODO = /TODO(.*)/ig;
    const regexpImp = /!/g;
    const regexpForm = /TODO\s?(.*);\s?(.*);\s?(.*)/i;
    let output;
    let imp;
    let name;
    let date;
    let comment;
    let filename;
    let delimeter = "  |  ";
    let space = " "; 
    let nameMax = 0;
    let dateMax = 0;
    let commentMax = 0;
    let filenameMax = 0;
    let outputLength = 0;
    let strArray = [];

    for(let i=0;i<files.length;i++){
        filename = files[i][0];
        if(filename.length > filenameMax)
            filenameMax = filename.length;
        if(filenameMax > 15)
            filenameMax = 15;
        while ((matches = regexpTODO.exec(files[i][1])) !== null){
            if((result = regexpForm.exec(matches[0])) !== null){
                name = new String(result[1]);
                date = new String(result[2]);
                comment = new String(result[3]);
                if(name.length > nameMax)
                    nameMax = name.length;
                if(nameMax > 10)
                    nameMax = 10;  
                if(date.length > dateMax)
                    dateMax = date.length;
                if(dateMax > 10)
                    dateMax = 10;
                if(comment.length > commentMax)
                    commentMax = comment.length;
                if(commentMax > 50)
                    commentMax = 50;
            }
        }
    }

    console.log(nameMax, dateMax, commentMax, filenameMax);

    for(let i=0;i<files.length;i++){

        filename = files[i][0];

        while ((matches = regexpTODO.exec(files[i][1])) !== null){            

            if(regexpImp.test(matches[0])){
                imp = " !";
            } else{
                imp = "  ";
            }

            if((result = regexpForm.exec(matches[0])) !== null){
                name = new String(result[1]);
                date = new String(result[2]);
                comment = new String(result[3]);
            } else{
                name = space.repeat(nameMax);
                date = space.repeat(dateMax);
                comment = new String(matches[1]);
            }

            if(name.length > nameMax)
            name = name.substring(0,7) + "...";     
        
            if(name.length < nameMax)
                name = name + space.repeat(nameMax - name.length);
                    
            if(date.length > dateMax)
                date = date.substring(0,8) + "..."; 

            if(date.length < dateMax)
                date = date + space.repeat(dateMax - date.length);
            
            if(comment.length > commentMax)
                comment = comment.substring(0,47) + "..."; 

            if(comment.length < commentMax)
                comment = comment + space.repeat(commentMax - comment.length);
            
            output = imp + delimeter + name + delimeter + date + delimeter + comment + delimeter + filename;

            if(output.length > outputLength)
                outputLength = output.length;

            strArray.push(output);                       
        }
    }

    let userHead = 'user' + space.repeat(nameMax - 'user'.length);
    let dateHead = 'date'+ space.repeat(dateMax - 'date'.length);
    let commentHead = 'comment' + space.repeat(commentMax - 'comment'.length);
    let filenameHead = 'fileName' + space.repeat(filenameMax - 'fileName');
    
    console.log(" !" + delimeter + userHead + delimeter + dateHead + delimeter + commentHead + delimeter + filenameHead);

    console.log('-'.repeat(outputLength));

    for(let i=0; i<strArray.length; i++){
        console.log(strArray[i]);
    }

    console.log('-'.repeat(outputLength));
}


//TODO реализовать сортировку и тд.


function important (){
    const files = getFiles();

    const regexpTODO = /TODO(.*)/ig;
    const regexpImp = /!/g;
    const regexpForm = /TODO\s?(.*);\s?(.*);\s?(.*)/i;
    let output;
    let imp;
    let name;
    let date;
    let comment;
    let filename;
    let delimeter = "  |  ";
    let space = " "; 
    let nameMax = 0;
    let dateMax = 0;
    let commentMax = 0;
    let filenameMax = 0;
    let outputLength = 0;
    let strArray = [];

    for(let i=0;i<files.length;i++){
        filename = files[i][0];
        if(filename.length > filenameMax)
            filenameMax = filename.length;
        if(filenameMax > 15)
            filenameMax = 15;
        while ((matches = regexpTODO.exec(files[i][1])) !== null){
            if((result = regexpForm.exec(matches[0])) !== null){
                name = new String(result[1]);
                date = new String(result[2]);
                comment = new String(result[3]);
                if(name.length > nameMax)
                    nameMax = name.length;
                if(nameMax > 10)
                    nameMax = 10;  
                if(date.length > dateMax)
                    dateMax = date.length;
                if(dateMax > 10)
                    dateMax = 10;
                if(comment.length > commentMax)
                    commentMax = comment.length;
                if(commentMax > 50)
                    commentMax = 50;
            }
        }
    }

    console.log(nameMax, dateMax, commentMax, filenameMax);

    for(let i=0;i<files.length;i++){

        filename = files[i][0];

        while ((matches = regexpTODO.exec(files[i][1])) !== null){            

            if(regexpImp.test(matches[0])){
                imp = " !";            

                if((result = regexpForm.exec(matches[0])) !== null){
                    name = new String(result[1]);
                    date = new String(result[2]);
                    comment = new String(result[3]);
                } else{
                    name = space.repeat(nameMax);
                    date = space.repeat(dateMax);
                    comment = new String(matches[1]);
                }

                if(name.length > nameMax)
                name = name.substring(0,7) + "...";     
            
                if(name.length < nameMax)
                    name = name + space.repeat(nameMax - name.length);
                        
                if(date.length > dateMax)
                    date = date.substring(0,8) + "..."; 

                if(date.length < dateMax)
                    date = date + space.repeat(dateMax - date.length);
                
                if(comment.length > commentMax)
                    comment = comment.substring(0,47) + "..."; 

                if(comment.length < commentMax)
                    comment = comment + space.repeat(commentMax - comment.length);
                
                output = imp + delimeter + name + delimeter + date + delimeter + comment + delimeter + filename;

                if(output.length > outputLength)
                    outputLength = output.length;

                strArray.push(output);  
            }                     
        }
    }

    let userHead = 'user' + space.repeat(nameMax - 'user'.length);
    let dateHead = 'date'+ space.repeat(dateMax - 'date'.length);
    let commentHead = 'comment' + space.repeat(commentMax - 'comment'.length);
    let filenameHead = 'fileName' + space.repeat(filenameMax - 'fileName');

    console.log(" !" + delimeter + userHead + delimeter + dateHead + delimeter + commentHead + delimeter + filenameHead);

    console.log('-'.repeat(outputLength));

    for(let i=0; i<strArray.length; i++){
        console.log(strArray[i]);
    }

    console.log('-'.repeat(outputLength));
}

function user (username){
    const files = getFiles();

    const regexpTODO = /TODO(.*)/ig;
    const regexpImp = /!/g;
    const regexpForm = /TODO\s?(.*);\s?(.*);\s?(.*)/i;
    const regexpName = new RegExp(username, 'i');
    const regexpPartName = new RegExp('^' + username.substr(0, 2) + '.*', 'i');    
    // const regexpPartName = new RegExp('asd', 'i'); 
    let output;
    let imp;
    let name;
    let date;
    let comment;
    let filename;
    let delimeter = "  |  ";
    let space = " "; 
    let nameMax = 0;
    let dateMax = 0;
    let commentMax = 0;
    let filenameMax = 0;
    let outputLength = 0;
    let strArray = [];

    for(let i=0;i<files.length;i++){
        filename = files[i][0];
        if(filename.length > filenameMax)
            filenameMax = filename.length;
        if(filenameMax > 15)
            filenameMax = 15;
        while ((matches = regexpTODO.exec(files[i][1])) !== null){
            if((result = regexpForm.exec(matches[0])) !== null){
                if((regexpName.test(result[1])) || (regexpPartName.test(result[1]))){
                    name = new String(result[1]);
                    date = new String(result[2]);
                    comment = new String(result[3]);
                    if(name.length > nameMax)
                        nameMax = name.length;
                    if(nameMax > 10)
                        nameMax = 10;  
                    if(date.length > dateMax)
                        dateMax = date.length;
                    if(dateMax > 10)
                        dateMax = 10;
                    if(comment.length > commentMax)
                        commentMax = comment.length;
                    if(commentMax > 50)
                        commentMax = 50;
                }
            }
        }
    }

    console.log(regexpPartName);
    console.log(nameMax, dateMax, commentMax, filenameMax);

    for(let i=0;i<files.length;i++){

        filename = files[i][0];

        while ((matches = regexpTODO.exec(files[i][1])) !== null){            

            if(regexpImp.test(matches[0])){
                imp = " !";
            } else{
                imp = "  ";
            }

            if((result = regexpForm.exec(matches[0])) !== null){
                if((regexpName.test(result[1])) || (regexpPartName.test(result[1]))){
                    name = new String(result[1]);
                    date = new String(result[2]);
                    comment = new String(result[3]);

                    if(name.length > nameMax)
                    name = name.substring(0,7) + "...";     
                
                    if(name.length < nameMax)
                        name = name + space.repeat(nameMax - name.length);
                            
                    if(date.length > dateMax)
                        date = date.substring(0,8) + "..."; 

                    if(date.length < dateMax)
                        date = date + space.repeat(dateMax - date.length);
                    
                    if(comment.length > commentMax)
                        comment = comment.substring(0,47) + "..."; 

                    if(comment.length < commentMax)
                        comment = comment + space.repeat(commentMax - comment.length);
                    
                    output = imp + delimeter + name + delimeter + date + delimeter + comment + delimeter + filename;

                    if(output.length > outputLength)
                        outputLength = output.length;

                    strArray.push(output);    
                }
            }                   
        }
    }

    let userHead = 'user' + space.repeat(nameMax - 'user'.length);
    let dateHead = 'date'+ space.repeat(dateMax - 'date'.length);
    let commentHead = 'comment' + space.repeat(commentMax - 'comment'.length);
    let filenameHead = 'fileName' + space.repeat(filenameMax - 'fileName');
    
    console.log(" !" + delimeter + userHead + delimeter + dateHead + delimeter + commentHead + delimeter + filenameHead);

    console.log('-'.repeat(outputLength));

    for(let i=0; i<strArray.length; i++){
        console.log(strArray[i]);
    }

    console.log('-'.repeat(outputLength));
}                
               

function sort (type){
    console.log('sort');

}

function date (date){
    console.log('date');

}

// TODO you can do it!
