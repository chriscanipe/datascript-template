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

### Named Functions and what they do

#### `init()`
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


#### `init()`





To build a chart in D3, you really only need to worry about the `/src` directory. 

This template takes an object-oriented approach to making charts in D3. In a nutshell, it's set up so you can write your chart script as a library or "module" that's then called from your main script. To learn more about this approach and why it works so well with D3, check out [this explainer](http://elliotbentley.com/2017/08/09/a-better-way-to-structure-d3-code-es6-version.html).

`src/js/app.js` is the main JavaScipt file. Think of this as your index page for JavaScript. Only the top level stuff goes here.
`src/js/chart-template.js` is 

---

### Available Gulp commands

#### `gulp serve`
Sets up a local server run out of `.tmp`. Watches your Sass, Handlebars and Javascript files and updates live in the browser.

The `gulp serve` task will default to `port 3000`, which you can view in browser as `http://localhost:3000/`.

Use the `-p` flag if you want to use a different port (for example, if you're already serving a proejct in port 3000, type `gulp serve -p 3002` to serve in port 3002.)

#### `gulp build`
Compiles your code into a single publishable directory called `/dist`

