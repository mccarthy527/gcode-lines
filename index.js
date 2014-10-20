"use strict"

//testing github, modifying file from home.

module.exports = states2lines

function states2lines(states) 
{
	var result = []
	result.lines = []
	result.extruded = []
	result.feedrate = []
	result.feedRate = []
	for(var i=1;i<states.length;i++)
	{
		result.lines[i] = [states[i-1].x, states[i].x]
		result.extruded[i] = states[i].e-states[i-1].e+states[i-1].fp
		if(result.extruded[i]<0)
		{
			result.extruded[i] = 0
		}
		result.feedRate[i] = [states[i-1].f, states[i].f]
	}
	return result
}