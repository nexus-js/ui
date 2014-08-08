~installation~
 
The easiest way to get osc-min is through [NPM](http://npmjs.org).
After install npm, you can install osc-min in the current directory with
 
```
npm install osc-min
```
 
If you'd rather get osc-min through github (for example, if you're forking
it), you still need npm to install dependencies, which you can do with
 
```
npm install --dev
```
 
Once you've got all the dependencies you should be able to run the unit
tests with 
 
```
npm test
npm run-script coverage
```