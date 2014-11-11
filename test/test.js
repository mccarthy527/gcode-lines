var sl = require('../index.js')
var gc = require('interpret-gcode')
var fs = require("fs")

var data = fs.readFileSync("C:/Users/Brian/Documents/GitHub/gcode-lines/test/testbox.gcode")

console.log('Current directory: ' + process.cwd());
var fileContent = data.toString()
var states = gc(fileContent)
var roads = sl(states)

for (i=0; i<roads.extruded.length; i++)
{
	console.log(roads.lines[i])
	console.log('extruded '+ roads.extruded[i])
	console.log('length: '+ roads.lngth[i])
	console.log('ratio: ' + roads.extruded[i]/roads.lngth[i])
	console.log('time: ' + roads.time[i])
	console.log('clock: ' + roads.clock[i])
	console.log('linenum: ' + roads.linenum[i])
	console.log('\n')
}
