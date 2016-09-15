# p5.js Game of Life
A JavaScript (p5.js) implementation of Conway's cellular automaton, Game of Life.

![screenshot](https://cloud.githubusercontent.com/assets/16089829/18462290/572c5370-7957-11e6-9360-435a44b61c61.png)

# Information
This is my implementation of Conway's Game of Life, I added some extra rules for corners and borders checking, so the game board is finite and not "infinite". The simulation will always start with a random initial state (live cells number). This application's engine is entirely based on boolean bidimensional arrays and, depending on their values, a rectangle is drawn on the screen at the right coordinates. I managed to significantly reduce the processing power required to execute the simulation by simply not drawing dead cells, and it's running pretty well even on my old laptop.

Access the following link to see it in action (if the simulation speed is too fast or too slow, you will need to make some adjustments in the gol-sketch.js file): https://rodrigocucick.github.io/gol-sketch/

*You can also run the glider-gun.js (don't forget to change the file reference in the .html file) to start the simulation with a Gosper's Glider Gun! It's interesting to see the gliders turning into stationary blocks before disappearing, this behaviour is due to the extra rules I've added to the simulation.*

![glider-gun](https://cloud.githubusercontent.com/assets/16089829/18538852/aa3c20c6-7ae8-11e6-9c5f-63d1abd16655.gif)

Keep in mind that I started to learn JavaScript and p5.js two days ago so, there must be some inefficiency here and there, but I managed to get the job done!

Rodrigo M. Cucick.
