const fs = require('fs');
const path = require('path');

const btnCreate=document.getElementById('btnCreate');
const btnRead=document.getElementById('btnRead');
const btnDelete=document.getElementById('btnDelete');
const fileName=document.getElementById('fileName');
const fileContents=document.getElementById('fileContents');

// let pathName = path.join(__dirname, '../Files');

let pathName = path.join(__dirname, '../../../../../../Documents/');

btnCreate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err){
        if(err){
            return console.log('err', err)
        }
        console.log('file was created')
    })
})

btnRead.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, function(err, data){
        if(err){
            return console.log('err', err)
        }
        fileContents.value= data;
        console.log('file was readed')
    })
})

btnDelete.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function(err){
        if(err){
            return console.log('err', err)
        }
        fileName.value='';
        fileContents.value= '';
        console.log('file was deleted')
    })
})