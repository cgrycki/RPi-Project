// Register the callback when a pointerlock event occurs
document.addEventListener('pointerlockchange', changeCallback, false);
document.addEventListener('mozpointerlockchange', changeCallback, false);
document.addEventListener('webkitpointerlockchange', changeCallback, false);

// When element is clicked, request a pointerlock

$("#pointerLock").click(
function () 
{
	var canvas = $("#pointerLock").get()[0];
	canvas.requestPointerLock = canvas.requestPointerLock ||
											   canvas.mozRequestPointerLock ||
											   canvas.webkitRequestPointerLock;

// Ask the browser to lock the pointer
canvas.requestPointerLock();
} );

// Called when the pointer lock has changed. Here we check whether the
// pointerlock was initiated on the element we want.
function changeCallback(e)	
{
	var canvas = $("#pointerLock").get()[0];
	if (document.pointerLockElement == canvas ||
		document.mozPointerLockElement == canvas ||
		document.webkitPointerLockElement == canvas)
	{
		// Pointerlock is for the element we want, add a mouselistener
		document.addEventListener("mousemove", moveCallback, false);
		document.addEventListener("mousedown", mouseDownCallback, false);
		document.addEventListener("mouseup", mouseUpCallback, false);
	}
	else
	{
		// Pointerlock is no longer active, remove the callback
		document.removeEventListener("mousemove", moveCallBack, false);
		document.addEventListener("mousedown", mouseDownCallback, false);
		document.addEventListener("mouseup", mouseUpCallback, false);
		// Reset entry coordinates
		entryCoordinates = {x:-1, y:-1};
	}
};

// Keep track of which mouse button is down
var mouseButtons = [0,0];

function mouseDownCallback(e)
{
	if( e.which == 1)
	{
		// Left Mouse Button Down
		console.log('Left Mouse Button Down');
		++mouseButtons[0];
	}
	else if( e.which == 2)
	{
		// Right Mouse Button Down
		console.log('Right Mouse Button Down');
		++mouseButtons[1];
		
		// Cut the movement speed in half
		moveCalls[2] = moveCalls[2] * 2;
	}
}

function mouseUpCallback(e)
{
	if( e.which == 1)
	{
		// Left Mouse Button Up
		console.log('Left Mouse Button Up');
		--mouseButtons[0];
	}
	else if( e.which == 2)
	{
		// Right Mouse Button Up
		console.log('Right Mouse Button Up');
		--mouseButtons[1];
		
		// Return the movement speed to normal
		moveCalls[2] = moveCalls[2] / 2;
	}
}
	
// Handles an event on the canvas for pointerlock 	
entryCoordinates = {x:-1, y:-1};
var moveCalls = new Array();	// [x-pixels-moved, y-pixels-moved, pixel-change-before-move]
moveCalls[0] = new Number(0);
moveCalls[1] = new Number(0);
moveCalls[2] = new Number(5);
function moveCallback(e)
{
	var canvas = $("pointerLock").get()[0];
	var context = canvas.getContext('2d');
	
	// if we enter this for the first time, get the initial position
	if (entryCoordinates.x == -1)
	{
		entryCoordinates = getPosition(canvas, e);
	}
	
	// Get a reference to the canvas
	var movementX = e.movementX ||
							 e.mozMovementX ||
							 e.webkitMovementX ||
							 0;
	
	var movementY = e.movementY ||
							 e.mozMovementY ||
							 e.webkitMovementY ||
							 0;
	
	// Calculate the new coordinates
	entryCoordinates.x = entryCoordinates.x + movementX;
	entryCoordinates.y = entryCoordinates.y + movementY;
	
	if	(movementX > 0)
	{
		// Moved Right
		++moveCalls[0];
	}
	else if (movementX < 0)
	{
		// Moved Left
		--moveCalls[0];
	}
	if (movementY > 0)
	{
		// Moved Down
		++moveCalls[1];
	}
	else if (movementY < 0)
	{
		// Moved Up
		--moveCalls[1];
	}
	
	if (Math.abs( moveCalls[0] ) >= moveCalls[2] )
	{
		// Move the launcher right
		if ( moveCalls[0] > 0 )
		{
		}
		// Move the launcher left
		else if ( moveCalls[0] < 0 )
		{
		}
		
		// Reset the x movecalls
		moveCalls[0] = new Number(0);
	}
	
	if (Math.abs( moveCalls[1] ) >= moveCalls[2] )
	{
		
		// Move the launcher down
		if ( moveCalls[1] > 0 )
		{
		}
		// Move the launcher up
		else if ( moveCalls[1] < 0 )
		{
		}
		
		// Reset the y movecalls
		moveCalls[1] = new Number(0);
	}
	