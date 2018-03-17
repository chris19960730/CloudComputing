const fs = require('fs');

const patternamount = /[0-9]*/;
let rr = [];
let result = [];
let ids = [];
let cnt = 0;

fs.readFile('user.csv', 'utf8', function (err, data) {
    let tmp = data.split('\r\n');
    for (let i = 0; i < tmp.length; i++){
        tmp[i] = tmp[i].split(',');


        if (tmp[i][0]){
            let id = parseInt(tmp[i][0]);
            if (!ids.includes(id)){
                ids.push(id);
                // result.push();
                fs.appendFileSync('userhandle.csv', tmp[i] + '\n')
            }
        }
    }
})