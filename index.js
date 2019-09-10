const { getAllFilePathsWithExtension, readFile } = require('./fileSystem');
const { readLine } = require('./console');

app();

function app() {
    console.log('\nPlease, write your command!\n');
    console.log(`exit\nshow\nimportant\nuser {username}\nsort {importance | user | date}\ndate {yyyy[-mm-dd]}\n`);
    readLine(processCommand);
}

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    regExit = /exit/i;
    regShow = /show/i;
    regImp = /important/i;
    regUser = /user (.*)/i;
    regSort = /sort (.*)/i;
    regDate = /date (.*)/i;
    array = getArray();
    switch (true) {
        case regExit.test(command):
            process.exit(0);
            break;
        case regShow.test(command):
            show(array);
            break;
        case regImp.test(command):
            important(array)
            break;
        case regUser.test(command):
            user(array, regUser.exec(command)[1]);
            break;
        case regSort.test(command):
            sort(array, regSort.exec(command)[1])
            break;
        case regDate.test(command):
            date(array, regDate.exec(command)[1])
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function getArray() {
    const files = getFiles();

    const regexpTODO = /TODO\s?(.*)/ig;
    const regexpImp = /!/g;
    const regexpForm = /TODO\s?:?\s?(.*);\s?(.*);\s?(.*)/i;
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

    for (let i = 0; i < files.length; i++) {
        filename = files[i][0];
        if (filename.length > filenameMax)
            filenameMax = filename.length;
        if (filenameMax > 15)
            filenameMax = 15;
        while ((matches = regexpTODO.exec(files[i][1])) !== null) {
            if ((result = regexpForm.exec(matches[0])) !== null) {
                name = new String(result[1]);
                date = new String(result[2]);
                comment = new String(result[3]);
                if (name.length > nameMax)
                    nameMax = name.length;
                if (nameMax > 10)
                    nameMax = 10;
                if (date.length > dateMax)
                    dateMax = date.length;
                if (dateMax > 10)
                    dateMax = 10;
                if (comment.length > commentMax)
                    commentMax = comment.length;
                if (commentMax > 50)
                    commentMax = 50;
            }
        }
    }

    for (let i = 0; i < files.length; i++) {

        filename = files[i][0];

        while ((matches = regexpTODO.exec(files[i][1])) !== null) {

            if (regexpImp.test(matches[0])) {
                imp = "  !";
            } else {
                imp = "   ";
            }

            if ((result = regexpForm.exec(matches[0])) !== null) {
                name = new String(result[1]);
                date = new String(result[2]);
                comment = new String(result[3]);
            } else {
                name = space.repeat(nameMax);
                date = space.repeat(dateMax);
                comment = new String(matches[1]);
            }

            if (name.length > nameMax)
                name = name.substring(0, 7) + "...";

            if (name.length < nameMax)
                name = name + space.repeat(nameMax - name.length);

            if (date.length > dateMax)
                date = date.substring(0, 8) + "...";

            if (date.length < dateMax)
                date = date + space.repeat(dateMax - date.length);

            if (comment.length > commentMax)
                comment = comment.substring(0, 47) + "...";

            if (comment.length < commentMax)
                comment = comment + space.repeat(commentMax - comment.length);

            output = { imp: imp, name: name, date: date, comment: comment, filename: filename };

            if ((output.imp + delimeter + output.name + delimeter + output.date + delimeter + output.comment + delimeter + output.filename).length > outputLength)
                outputLength = (output.imp + delimeter + output.name + delimeter + output.date + delimeter + output.comment + delimeter + output.filename).length;

            strArray.push(output);
        }
    }

    let array = { array: strArray, outputLength: outputLength };
    return array;
}

function printHeader(array) {
    let delimeter = "  |  ";
    let space = ' ';

    let userHead = 'user' + space.repeat(array[0].name.length - 'user'.length);
    let dateHead = 'date' + space.repeat(array[0].date.length - 'date'.length);
    let commentHead = 'comment' + space.repeat(array[0].comment.length - 'comment'.length);
    let filenameHead = 'fileName' + space.repeat(array[0].filename.length - 'fileName'.length);

    console.log("  !" + delimeter + userHead + delimeter + dateHead + delimeter + commentHead + delimeter + filenameHead);
}

function printLine(outputLength) {
    console.log('-'.repeat(outputLength));
}

function printArray(array, outputLength, type) {

    let delimeter = "  |  ";

    switch (type.type) {
        case 'important':
            printHeader(array);
            printLine(outputLength);
            for (let i = 0; i < array.length; i++) {
                if (type.reg.test(array[i].imp))
                    console.log((array[i].imp + delimeter + array[i].name + delimeter + array[i].date + delimeter + array[i].comment + delimeter + array[i].filename));
            }
            printLine(outputLength);
            break;
        case 'user':
            printHeader(array);
            printLine(outputLength);
            for (let i = 0; i < array.length; i++) {
                if (type.reg.test(array[i].name))
                    console.log((array[i].imp + delimeter + array[i].name + delimeter + array[i].date + delimeter + array[i].comment + delimeter + array[i].filename));
            }
            printLine(outputLength);
            break;
        case 'date':
            printHeader(array);
            printLine(outputLength);
            for (let i = 0; i < array.length; i++) {
                let dateA = new Date(array[i].date), dateB = new Date(type.reg);
                if (dateA >= dateB)
                    console.log((array[i].imp + delimeter + array[i].name + delimeter + array[i].date + delimeter + array[i].comment + delimeter + array[i].filename));
            }
            printLine(outputLength);
            break;
        default:
            printHeader(array);
            printLine(outputLength);
            for (let i = 0; i < array.length; i++) {
                console.log((array[i].imp + delimeter + array[i].name + delimeter + array[i].date + delimeter + array[i].comment + delimeter + array[i].filename));
            }
            printLine(outputLength)
            break;
    }
}


function show(array) {
    printArray(array.array, array.outputLength, '');
}


function important(array) {
    let type = { type: 'important', reg: /!/ };

    printArray(array.array, array.outputLength, type);
}


function user(array, username) {
    let type = { type: 'user', reg: new RegExp('^' + username, 'i') };

    printArray(array.array, array.outputLength, type);
}


function sort(array, type) {
    let space = ' ';
    let buf;

    switch (type) {
        case 'importance':
            k = 0;

            const regexpImp = /!/g;

            for (let i = 0; i < array.array.length; i++)
                if (regexpImp.test(array.array[i].imp)) {
                    buf = array.array[i];
                    array.array[i] = array.array[k];
                    array.array[k] = buf;
                    k = k + 1;
                }

            for (let i = 0; i < k; ++i)
                for (let j = 0; j < k - i; j++)
                    if (array.array[j].comment.split("!").length - 1 < array.array[j + 1].comment.split("!").length - 1) {
                        buf = array.array[j];
                        array.array[j] = array.array[j + 1];
                        array.array[j + 1] = buf;
                    }
            break;
        case 'user':
            k = 0;

            array.array.sort(function (a, b) {
                let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            })

            for (let i = 0; i < array.array.length; i++)
                if (array.array[i].name !== space.repeat(array.array[0].name.length)) {
                    buf = array.array[i];
                    array.array[i] = array.array[k];
                    array.array[k] = buf;
                    k = k + 1;
                }

            break;
        case 'date':
            k = 0;

            array.array.sort(function (a, b) {
                let dateA = new Date(a.date), dateB = new Date(b.date)
                return dateB - dateA
            });

            for (let i = 0; i < array.array.length; i++)
                if (array.array[i].date !== space.repeat(array.array[i].date.length)) {
                    buf = array.array[i];
                    array.array[i] = array.array[k];
                    array.array[k] = buf;
                    k = k + 1;
                }

            break
        default:
            console.log('wrong type of sort');
            break;
    }

    printArray(array.array, array.outputLength, '');
}


function date(array, date) {
    let type = { type: 'date', reg: date };
    let space = ' ';
    let buf;
    let k = 0;

    array.array.sort(function (a, b) {
        let dateA = new Date(a.date), dateB = new Date(b.date)
        return dateB - dateA
    });

    for (let i = 0; i < array.array.length; i++)
        if (array.array[i].date !== space.repeat(array.array[0].date.length)) {
            buf = array.array[i];
            array.array[i] = array.array[k];
            array.array[k] = buf;
            k = k + 1;
        }

    printArray(array.array, array.outputLength, type);
}

// TODO you can do it!
