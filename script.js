const xlsx = require('node-xlsx');
const fs = require("fs");
const _ = require('lodash');
const request = require("request");
const async = require("async");
const json2csv = require('json2csv');
const d3 = require('d3');

function init() {

    /* ===+===+===+===+===+===+=== */
    /* D A T A   C A L L S 📞 */
    /* ===+===+===+===+===+===+=== */

    //SET UP YOUR DATA CALLS HERE.
    //THIS HAPPENS IN AN ASYNC ARRAY SO TAHT WE CAN STACK MULTIPLE CALLS IF WE WANT TO
    //JUST NEST THEM IN THE ARRAY
    async.series(
        [

            function(callback) { //CSV EXAMPLE
                fs.readFile('some-csv-file.csv', 'utf8', function(err, d) {
                    let data = d3.csvParse(d); //USE THE D3 CSV PARSER TO GET OBJECT ARRAY
                    callback(null, data);
                });
            },
            function(callback) { //EXCEL EXAMPLE
                var data = xlsx.parse('some-excel-file.xlsx');
                callback(null, data);
            }

        ],
        function(err, results) {

            // `results` is an array responses from the above requests
            // The Excel parser returns as an object that looks like this:

            // [{
            //     name : [[WORKSHEET NAME]]
            //     data : [[THIS DATA IS A RAW ARRAY OF ARRAYS]]
            // }]

            let data1 = results[0];
            let data2 = toObjectArray(results[1][0].data); //USE THE toObjectArray() FUNCTION TO CONVERT THE EXCEL DATA TO AN OBJECT ARRAY

            setData(data1, data2);

        }
    )


}


function setData(data1, data2) {

    let theData = [];
    let theLookup = {};

    //The goal is usally to get your dataset organized as a clean array of objects.
    //I often append data to a dictionary-type object called `theLookup`, then spin that out into an array.
    //That array is then passed to either `writeJSON()` or `writeCSV`

    writeJSON(theData);
    //writeCSV(theData);

}


function writeJSON(data, filename) {

    //Stringify the data
    var theJson = JSON.stringify(data);

    //...and write it to an data.json file. (or whatever you want to call it)
    fs.writeFile(`${filename}.json`, theJson, function(err) {
        if (err) return console.log(err);
        console.log('Data Success.');
    });


}


function writeCSV(arr, filename) {

    let fields = Object.keys(arr[0]); //Column headers (must exist in each object in your array)
    
    let csvData = json2csv({
        data: arr,
        fields: fields
    });

    //...and write it to a data.csv file. (or whatever you want to call it)
    fs.writeFile(`${filename}.csv`, csvData, err => {
        if (err) return console.log(err);
        console.log('Data Success.');
    });

}



init();





/* ===+===+===+===+===+===+=== */
/* U T I L I T I E S */
/* ===+===+===+===+===+===+=== */

//Converts that crazy Excel data format into an object array.
function toObjectArray(origArray) {

    var newArray = [];
    for (var index = 1; index < origArray.length; index++) {
        newArray.push(_.zipObject(origArray[0], origArray[index]));
    }

    return newArray;

}

//Add leading zeros to integers and return them as strings.
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//Round a number to a specified decimal place
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}