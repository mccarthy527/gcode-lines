# gcode-lines

Produces toolpath as a series of line segments given the current state of the printer after each line of gcode.  Intended for use with [interpret-gcode](https://npmjs.org/package/interpret-gcode)

## Example

```javascript
var sl = require("gcode-lines")
var gc = require("interpret-gcode")
var fs = require("fs")

var data = fs.readFileSync("test.gcode")
var fileContent = data.toString()
var states = gc(fileContent)
var roads = sl(states)
console.log(roads.lines)
```

## Install

```
npm install gcode-lines
```

## API

### `require("gcode-lines")(states)`

* states - An array where each entry specifies the state of the machine.

**Returns** the toolpath represented as a list of line segments along with extrusion and feedrate information

### State properties

Each state needs the following properties:

* x - current nozzle position [x,y,z] in absolute coordinates
* e - current amount of material that has been pushed through the nozzle at this state (again in absolute coordinates)
* f - feedrate in units/unit time.
* fp - filament end position wrt nozzle end.  Must be less than or equal to 0.  If less than zero, the filament is retracted, if zero, the filament is at the end of the nozzle.

## License

The MIT License (MIT)

Copyright (c) 2014 Brian McCarthy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
