var sl = require('../index.js')
var gc = require('interpret-gcode')
var fs = require("fs")
var test = require('tape')
var path = require('path')


function runTest(t, fileName) {
	var data = fs.readFileSync(path.join(__dirname, fileName))
	var fileContent = data.toString()
	var history = gc(fileContent)
	//console.log(history)
	var roads = sl(history)
	console.log(roads.lines)
	return roads
}

function testCase(t) {
	//var roads = runTest(t, "../../gcode-parser/test/simpletest2.gcode")
	//var roads = runTest(t, "../test/testbox.gcode")
	var  roads = runTest(t, "../../gcode-parser/test/simpletest1.gcode")
	t.end()
}

test('gcode-to-lines', testCase)