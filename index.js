"use strict"

//testing github, modifying file from home.

module.exports = states2lines

function states2lines(states) 
{
	var result = []
	result.lines = []
	result.extruded = []
	result.feedRate = []
	result.lngth = []
	result.clock = [] 		//time from the very first gcode command in the file until this particular line is completed
	result.clock[0] = 0
	result.time = []		//time to move from the previous to the current state
	result.linenum = []


	for(var i=1;i<states.length;i++)
	{
		result.lines[i] = [states[i-1].x, states[i].x]
		result.extruded[i] = states[i].e-states[i-1].e+states[i-1].fp
		if(result.extruded[i]<0)
		{
			result.extruded[i] = 0
		}
		result.feedRate[i] = [states[i-1].f, states[i].f]
		result.lngth[i] = distance(states[i-1].x, states[i].x)
		
		//compute time
		result.time[i] = calcTime(result.lngth[i], states[i-1].f, states[i].f, false)
		result.clock[i] = result.clock[i-1] + result.time[i]
		
		//set layer and line number
		result.linenum[i] = [states[i-1].linenum, states[i].linenum]
	}
	return result
}
//lnght - length of the extrusion 						[mm]
//prevfeedrate - feedrate at the start of the move		[mm/min]
//currfeedrate - feedrate at the end of the move		[mm/min]
//interpfeedrate - should feedrate be interpolated?		boolean
function calcTime(lngth, prevfeedrate, currfeedrate, interpfeedrate)
{
	var time = 0
	if(interpfeedrate) 	//feedrate is linearly interpolated
	{
		console.error('interpolation of feedrates is not implemented yet!')
	}
	else if(currfeedrate == 0)
	{
		console.log('zero feedrate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
	}
	else 				//use feedrate from the current state
	{
		time =  lngth/currfeedrate*60 	//time for this move is in seconds.
	}
	return time
}

function distance(A,B)
{
	var dx = A[0]-B[0] 
	var dy = A[1]-B[1] 
	var dz = A[2]-B[2] 
	return Math.sqrt(dx*dx + dy*dy + dz*dz)
}