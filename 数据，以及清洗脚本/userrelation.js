const fs = require('fs');

fs.readFile('employee.csv', 'utf8', function (err, data) {
    let tmp = data.split('\r\n');
    let user = [];
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].split(',');
        user.push(tmp[i][0]);
    }

    for (let i = 0; i < 5000; i++) {
        let offset = parseInt(Math.random() * 800);
        console.log(user[offset] + ',' + i);
        fs.appendFileSync('relation-6.csv', user[offset] + ',' + i + '\n')
    }
})