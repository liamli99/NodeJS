## Introduction
Node.js is an environment to run JavaScript outside the web browser, it is built on Chrome's V8 JS engine, it has big community and is full-stack

## Node.js VS Browser
Browser: (1) DOM (2) Window (3) Interactive Apps (4) No Filesystem (5) Fragmentation (6) ES6 Modules

Node.js: (1) No DOM (2) No Window (3) Server Side Apps (4) Filesystem (5) Versions (6) CommonJS

## REPL VS CLI
REPL (Read-Eval-Print Loop): In the terminal, type `node` and press Enter. The usage is similar to browser console, it is a programming language environment that takes single expression as user input and returns the result back to the console after execution. REPL only provides a convenient way to quickly test simple JS code!

CLI (Command Line Interface): Save the JS code in a file, and run the file through command line by typing `node filename.js`. 

## Global Variables 
(1) `__dirname`: path to current directory
(2) `__filename`: file name
(3) `require`: function to use modules (CommonJS)
(4) `module`: information about current module (file)
(5) `process`: information about environment where the program is being executed   
There is no `window`!!!

## Modules
1. CommonJS modules. CommonJS modules are the original way to package JS code for Node.js. In Node.js, each file is treated as a separate module by default! 

2. ECMAScript modules. Node.js also supports ECMAScript modules, which are the official standard format to package JS code for reuse. See JavaScript for more examples!

For this course, we will use CommonJS modules, but ES modules works exactly the same with a different grammar!

3. Built-in Modules: e.g. (1) OS (2) PATH (3) FS (4) HTTP. For each module, it can provide useful properties and methods! For more details, see https://nodejs.org/docs/latest/api/

## Node Package Manager (npm)
'npm' comes bundled with Node.js and is the default package manager for Node.js, it helps developers share and reuse code!

1. Initialization
(1) Manual approach: create a 'package.json' file in the root with necessary properties
(2) General approach: `npm init` (answer a series of questions step by step to set up the project) OR `npm init -y` (answer all the questions with default values), then a 'package.json' file will be generated!

2. Install packages
**Install packages as dependencies**, dependencies are packages required by the application to run in production!
(1) Install a local package (use it in the current project), recommended!
`npm install <packagename>`
(2) Install a global package (use it in any project)
`npm install -g <packagename>`

**Install packages as dev dependencies**, dev dependencies are packages that are only needed for local development and testing!
`npm install <packagename> --save-dev` OR `npm install <packagename> -D`

Note that all the local packages we install are stored in node_modules folder and are included in dependencies/devDependencies of package.json!     
Normally we won't push node_modules folder to github, so that if we clone a Node.js project from github, we can run `npm install` to install all the packages in dependencies/devDependencies of package.json!

3. Use packages
Similar to modules, we can use require (CommonJS Modules) or import (ES Modules) to include the package! For more details, see https://www.npmjs.com/

## Useful packages
1. nodemon
`nodemon` can automatically restart the application when the file changes, so that we don't have to manually stop and restart the server every time the file changes! This is similar to live server! We always install it as dev dependency!
