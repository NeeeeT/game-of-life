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

function setup() {
	createCanvas(GRID_WIDTH, CANVAS_HEIGHT);
	createArrays();
	initializeVariables();
	displayGrid();
}

function draw() {
	if (!isPaused) {
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

function createArrays() {
	mainGridArray = new Array(ARRAY_Y_ELEMENTS);
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		mainGridArray[i] = new Array(ARRAY_X_ELEMENTS);

		// Here I'm drawing (hard coding) an initial shape for the Gosper's Glider Gun.
		switch (i) {
			case 19: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
					    	     false, false, false, false, false, false, false, false,
						     false, false, false, true, true, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false]; break;

			case 20: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, true, false, false, false, true, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false]; break;

			case 21: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, true, true, false, false, false, false, false,
						     false, false, false, false, false, false, false, false, true,
						     false, false, false, false, false, true, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false]; break;

			case 22: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, true, true, true, false, false, false,
						     false, true, true, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, true, false,
						     false, false, true, false, true, true, false, false, true,
						     true, false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false]; break;

			case 23: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, true, true, true, true, true, false, false,
						     false, false, false, false, true, true, false, false, false,
						     false, false, false, false, false, false, false, true, false,
						     false, false, false, false, true, false, false, false, true,
						     true, false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false]; break;

			case 24: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, true, false, true, false, false, false, true, false,
						     false, false, false, false, true, true, true, false, false,
						     false, false, false, false, false, false, false, false, true,
						     false, false, false, true, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false]; break;

			case 25: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, true, true, false, false, false, true, false, false,
						     false, false, false, false, true, true, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, true, true, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false]; break;

			case 26: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, true, true, false, false, false, false, false,
						     false, false, false, false, true, false, true, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false]; break;

			case 27: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, true, true, false, false, false, false, false,
						     false, false, false, false, false, true, true, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false]; break;

			case 28: mainGridArray[i] = [false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, true, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false, false, false, false,
						     false, false, false, false, false];
		}
	}

	updatedGridArray = new Array(ARRAY_Y_ELEMENTS);
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		updatedGridArray[i] = new Array(ARRAY_X_ELEMENTS);
	}
}

function initializeVariables() {
	// This time the mainArrayGrid will not re-initialize, because the
	// only purpose of this simulation is to create the glider gun.
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

function displayGrid() {
	let i = 0, j = 0;

	noStroke();
	fill(0);
	rect(0, 0, GRID_WIDTH, GRID_HEIGHT);
	fill(255);

	for (var y = 0; y < GRID_HEIGHT; y += RECT_SIZE) {
		for (var x = 0; x < GRID_WIDTH; x += RECT_SIZE) {
			if (mainGridArray[i][j]) rect(x, y, RECT_SIZE, RECT_SIZE);

			j++;
		}

		j = 0;
		i++;
	}
}

function displayGUI() {
	fill(255); rect(0, GRID_HEIGHT, GRID_WIDTH, 768);
	fill(0); textSize(16);
	text("Generation: " + generation + "  Population: " + population, 10, 620);
	text("[LEFT CLICK = PAUSE]  [MIDDLE CLICK = RESET]", 405, 620);
}

function mousePressed() {
	if (mouseButton == LEFT) {
		if (isPaused) isPaused = false;
		else isPaused = true;
	}

	if (mouseButton == CENTER && !isPaused) initializeVariables();
}

function checkGrid() {
	var neighbours;

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			neighbours = 0;

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

function updateGrid() {
	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			mainGridArray[i][j] = updatedGridArray[i][j];
		}
	}
}

function countPopulation() {
	population = 0;

	for (var i = 0; i < ARRAY_Y_ELEMENTS; i++) {
		for (var j = 0; j < ARRAY_X_ELEMENTS; j++) {
			if (mainGridArray[i][j]) population++;
		}
	}
}
