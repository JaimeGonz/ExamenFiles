const fs = require("fs")
const chalk = require("chalk")
const path = "./docs/"
// const dir = "docs"
//const ext = ".txt"

const addTextDoc = function(title, text){

    const files = allDocs()
    const duplicateFiles = files.filter(function(file){
        return file === title
    })

    if (duplicateFiles.length === 0){
        fs.writeFileSync(path+title+'.txt', text, (error)=>{
            if(error){
                throw error;
            }
            console.log(chalk.green.inverse("El archivo se creó exitosamente"))
        })
    }else{
        console.log(chalk.red("El documento ya existe"))
    }
}

const showDoc = function(title) {
    const content = fs.readFileSync(path+title, 'utf-8')
    // const files =  fs.readdirSync(dir)
    return content
}

const allDocs = function(){
    const files =  fs.readdirSync(path)
    return files
}

const modify = function(title, ntitle, nbody){
    console.log(title)
    console.log(ntitle)
    console.log(nbody)

    if(ntitle !=  title){
        fs.unlink('docs/'+title, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    
        addTextDoc(ntitle, nbody)
    }else{
        fs.writeFileSync(path+title, nbody, (error)=>{
            if(error){
                throw error;
            }
        })
    }
}

const erase = function(title){
    fs.unlink('docs/'+title, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
}

module.exports = {
    addTextDoc : addTextDoc,
    showDoc : showDoc,
    allDocs : allDocs,
    modify : modify,
    erase : erase
}