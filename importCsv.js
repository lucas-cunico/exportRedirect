const fs = require('fs')
const readline = require('readline');

module.exports = async  () => {
  const fileStream = fs.createReadStream('./file02.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let json = {}
  const first = 0, second = 1, third = 2
  rl.on('line', (line) => {
      let obj = line.split(',')
      if(obj[second].trim() === '301' || obj[second].trim() === '302'){
        if(json[`${obj[first].replace('www.intelbras.com.br', '')}`]){
          console.log(`${obj[first].replace('www.intelbras.com.br', '')}`)
          console.log(json[`${obj[first].replace('www.intelbras.com.br', '')}`])
          console.log('----------------')
        }
        json[`${obj[first].replace('www.intelbras.com.br', '')}`] = {
          path: obj[third].replace('https://www.intelbras.com', ''),
          status: obj[second]
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