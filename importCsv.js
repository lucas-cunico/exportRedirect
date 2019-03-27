const fs = require('fs')
const readline = require('readline');

module.exports = async  () => {
  const fileStream = fs.createReadStream('./file.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let json = {}
  rl.on('line', (line) => {
      let obj = line.split(',')
      if(obj[2] === '301' || obj[2] === '302'){
        if(json[`${obj[1].replace('www.intelbras.com.br', '')}`]){
          console.log(`${obj[1].replace('www.intelbras.com.br', '')}`)
          console.log(json[`${obj[1].replace('www.intelbras.com.br', '')}`])
          console.log('----------------')
        }
        json[`${obj[1].replace('www.intelbras.com.br', '')}`] = {
          path: obj[3],
          status: obj[2]
        }
      }
  }).on('close', () => {
    fs.writeFile("./redirect.json", JSON.stringify(json), 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`count register: ${Object.keys(json).length}`)
        console.log("The file was saved!");
    }); 
  })
}