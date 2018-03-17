const fs = require('fs');

const patternprice = /[0-9]*\.[0-9]*/;
const patternamount = /[0-9]*/;
let rr = [];
let result = [];
let ids = [];
let cnt = 0;
let priceA;
let amountA;

fs.readFile('items.csv', 'utf8', function (err, data) {
    let tmp = data.split('\r\n');
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = tmp[i].split(',');
        priceA = false;
        amountA = false;


        let price = tmp[i][3].match(patternprice);
        if (price > 0) {
            tmp[i][3] = price[0];
            priceA = true;
        }


        let amount = tmp[i][4].match(patternamount);
        if (amount > 0) {
            tmp[i][4] = amount[0];
            amountA = true;
        }

        let sort = tmp[i][8].split('>');
        console.log(sort)
        tmp[i][8] = sort[sort.length - 1];

        if (amountA && priceA){
            console.log(tmp[i]);
            fs.appendFileSync('itemhandler.csv', tmp[i] + '\n');
        }

    }
})