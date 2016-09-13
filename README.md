# p5.js Game of Life
A JavaScript (p5.js) implementation of Conway's cellular automaton, Game of Life.

# Information
This is my implementation of Conway's Game of Life, I added some extra rules for corners and borders checking, so the game board is finite. The simulation will always start with a random initial state (live cells number). This application's engine is entirely based on bidimensional boolean arrays and, based on their boolean indexes values, a rectangle in drawn on the screen at the right coordinates. I managed to significantly reduce the processing power required to execute the simulation by simply not drawing dead cells, and it's running pretty well even on my old laptop.
