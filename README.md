## Data scripting template

This is a Node.js script that I often use to clean and shape large datasets. It includes an async parsing function that can pull in multiple JSON, CSV, TSV and Excel files. I typically load a few files, then pass them to a `setData()` function where I loop through the datasets to combine, clean and perform operations. Once you have a clean object array, you can save your data in a new file as either JSON or CSV.

---

### How to use this template.

1) Clone this repository to your working directory.

2) Using Terminal, `cd` into the directory.

3) run `npm install`.

4) Load your datasets via relative paths, then output them locally via the `writeJSON()` or `writeCSV()` functions.

5) To run the script in the Terminal, type: `node script.js`.

6) Millertime.

---

### Named Functions and what they do:

##### [`init()`](#init)
Contains an `async` function that lets you load an array of data requests. Simply add as many files as you wish to the array, then catch them in the `results` array in the callback. The called data will appear in the `results` array in the order in which the cals they were made.

##### CSV, TSV, and JSON files

The `async` function uses the `d3-fetch` parsing method, which can parse CSV, TSV, and JSON among other formats. Simple parse the requested output before passing it to the callback.

##### Excel files

The Excel parser returns an array of objects, one for each worksheet in the file:

```
[{
    name : [[WORKSHEET NAME]]
    data : [[THIS DATA IS A RAW ARRAY OF ARRAYS]]
}]
```

You'll need to run that `data` array through the `toObjectArray()` function before handing it off to your `setData()` function.


##### `setData(data1, data2...)`
This is where I do my data manipulation. My general pattern is to create a dictionary object (ex: `theLookup = {}`), to which I append keys and values that may appear in multiple datasets. Once I've created all of my named variables and values, I then loop through the dictionary keys and push their values to an object array (ex: `theData = []`). That clean object array is what I write to a new file.

##### `writeJSON(array, filename)`
This simply stringifies the object array and writes it to a file.

`array` is an object array.

`filename` is a string that will be used to name your file. If no string is passed, the file will be called `data.json`.

---

##### `writeCSV(array, filename)`
This uses the `json2csv` library to turn an object array into CSV.

`array` is an object array.

`filename` is a string that will be used to name your file. If no string is passed, the file will be called `data.json`.

`fields` is an array of property names present in each object. By default, all property names in the first object will be included, but you can customize this to include only the fields you want. Field names will appear in the order in which they are written in the array.


---

### Utilities

##### `toObjectArray(array of arrays)` 
The output from an Excel file requires an extra step to be iterable as an object array. If you send the `data` property of an Excel sheet, you'll get back a clean data array in the same format you'd get when parsing a CSV file using `d3.csv()`.

##### `pad(n,width,z)`
Adds zero-padding to an integer and returs a string.
`n` is the integer you want to pad.
`width` is the total width you need your string to be. Ex: `pad(4,5)` will return `00004`.
`z` (optional) A string other than `0`. Ex: `pad(4,5, 'x')` will return `xxxx4`.

##### `round(value, decimals)`
`value` (decimal number) The numerical value you wish to round.
`decimals` (integer) The number of places to which you wish to round. Ex: `round(3.141592, 2)` will return `3.14`.

