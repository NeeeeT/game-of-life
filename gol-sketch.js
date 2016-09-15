/*
 * MIT License
 *
 *	Copyright (c) 2016 Rodrigo Monfredini Cucick
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in all
 *	copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *	SOFTWARE.
 */

const GRID_HEIGHT = 600, GRID_WIDTH = 800, CANVAS_HEIGHT = 630;
const ARRAY_Y_ELEMENTS = 60, ARRAY_X_ELEMENTS = 80;
const RECT_SIZE = 10;
var mainGridArray, updatedGridArray, booleanValuesArray;
var generation, population, timer, isPaused;

// setup() executes all the work necessary for the initialization of the program.
function setup() {
	createCanvas(GRID_WIDTH, CANVAS_HEIGHT);
	createArrays();
	initializeVariables();
	displayGrid();
	displayGUI();
}

/*
 * draw() is the "main loop" of the program,
 * its logical flow is crudely represented by the following steps:
 * 1: Analyze the current state of the board.
 * 2: Update the state of the board.
 * 3: Count the population number.
 * 4: Display the board and the GUI.
 */
function draw() {
	if (!isPaused) {
		// If you have a high frequency CPU and/or GPU it's possible that you'll need to adjust the way
		// the timer variable works, so the simulation will run at a reasonable pace, not too fast, not too slow.
		// There's nothing "fancy" here, it's just a basic cycle counter. Using floats here might be a good idea.
		if (timer % 2 == 0) {
			timer = 0;

			checkGrid();
			updateGrid();

			generation++;

			countPopulation();
			displayGrid();
			displayGUI();
		}
	}
	timer++;
}

// This function creates the two main bidimensional arrays.
function createArrays() {
	mainGridArray = new Array(ARRAY_Y_ELEMENTS);
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		mainGridArray[i] = new Array(ARRAY_X_ELEMENTS);
	}

	updatedGridArray = new Array(ARRAY_Y_ELEMENTS);
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		updatedGridArray[i] = new Array(ARRAY_X_ELEMENTS);
	}
}

// initializeVariables() is self-explanatory, all it does is pertinent
// to initializing variables.
function initializeVariables() {
	// The booleanValuesArray stores 10 hard coded boolean values (1 true, 9 falses).
	// It was created to be used in conjunction with random(), resulting in a 1/10
	// chance to create a live cell in the board, so the initial state
	// is not that crowded with live cells.
	booleanValuesArray = [true, false, false, false, false,
								 false, false, false, false, false];

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			mainGridArray[i][j] = random(booleanValuesArray);
		}
	}

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			updatedGridArray[i][j] = mainGridArray[i][j];
		}
	}

	generation = 0;
	population = 0;
	timer = 0;
	isPaused = false;
}

// displayGrid() is responsible for drawing the board.
function displayGrid() {
	let i = 0, j = 0;

	noStroke();
	fill(0);
	rect(0, 0, GRID_WIDTH, GRID_HEIGHT); // Fills the cell grid area with a black rect.
	fill(255);

	for (var y = 0; y < GRID_HEIGHT; y += RECT_SIZE) {
		for (var x = 0; x < GRID_WIDTH; x += RECT_SIZE) {
			// If the value in mainGridArray[i][j] is true, draw a white rectangle
			// on the coordinates that correspond to that index. In this for loop
			// I'm using the RECT_SIZE constant to easily transform
			// a bidimensional array index into cartesian coordinates.
			if (mainGridArray[i][j]) rect(x, y, RECT_SIZE, RECT_SIZE);

			j++;
		}

		j = 0;
		i++;
	}
}

// displayGUI() display some text information on the screen.
function displayGUI() {
	fill(255); rect(0, GRID_HEIGHT, GRID_WIDTH, 768);
	fill(0); textSize(16);
	text("Generation: " + generation + "  Population: " + population, 10, 620);
	text("[LEFT CLICK = PAUSE]  [MIDDLE CLICK = RESET]", 405, 620);
}

// Mouse events.
function mousePressed() {
	if (mouseButton == LEFT) {
		if (isPaused) isPaused = false;
		else isPaused = true;
	}

	if (mouseButton == CENTER && !isPaused) initializeVariables();
}

// Game logic.
function checkGrid() {
	var neighbours;

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			neighbours = 0;

			// Rules for the corners.
			if (i == 0 && j == 0) {
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i + 1][j + 1]) neighbours++;
			}
			else if (i == 0 && j == (ARRAY_X_ELEMENTS - 1)) {
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i + 1][j - 1]) neighbours++;
			}
			else if (i == (ARRAY_Y_ELEMENTS - 1) && j == 0) {
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i - 1][j + 1]) neighbours++;
			}
			else if (i == (ARRAY_Y_ELEMENTS - 1) && j == (ARRAY_X_ELEMENTS - 1)) {
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i - 1][j - 1]) neighbours++;
			}
			// Rules for the borders.
			else if (i == 0 && (j > 0 && j < (ARRAY_X_ELEMENTS - 1))) {
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i + 1][j - 1]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i + 1][j + 1]) neighbours++;
			}
			else if (i == (ARRAY_Y_ELEMENTS - 1) && (j > 0 && j < (ARRAY_X_ELEMENTS - 1))) {
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i - 1][j - 1]) neighbours++;
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i - 1][j + 1]) neighbours++;
			}
			else if ((i > 0 && i < (ARRAY_Y_ELEMENTS - 1)) && j == 0) {
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i - 1][j + 1]) neighbours++;
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i + 1][j + 1]) neighbours++;
			}
			else if ((i > 0 && i < (ARRAY_Y_ELEMENTS - 1)) && j == (ARRAY_X_ELEMENTS - 1)) {
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i - 1][j - 1]) neighbours++;
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i + 1][j - 1]) neighbours++;
			}
			// General rules.
			else {
				if (mainGridArray[i - 1][j - 1]) neighbours++;
				if (mainGridArray[i - 1][j]) neighbours++;
				if (mainGridArray[i - 1][j + 1]) neighbours++;
				if (mainGridArray[i][j - 1]) neighbours++;
				if (mainGridArray[i][j + 1]) neighbours++;
				if (mainGridArray[i + 1][j - 1]) neighbours++;
				if (mainGridArray[i + 1][j]) neighbours++;
				if (mainGridArray[i + 1][j + 1]) neighbours++;
			}

			// All changes are stored in a secondary array and, after a complete scan,
			// the mainGridArray will receive all of its updated values at once. This is
			// necessary to avoid erratic behavior.
			if (mainGridArray[i][j]) {
				if (neighbours < 2) updatedGridArray[i][j] = false;
				else if (neighbours > 3) updatedGridArray[i][j] = false;
			}
			else {
				if (neighbours == 3) updatedGridArray[i][j] = true;
			}
		}
	}
}

// updateGrid() copies all values in updatedGridArray to mainGridArray.
function updateGrid() {
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			mainGridArray[i][j] = updatedGridArray[i][j];
		}
	}
}

// Simple function that counts the number of live cells.
function countPopulation() {
	population = 0;

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			if (mainGridArray[i][j]) population++;
		}
	}
}
