# Tutor Point Calculator
This Extension should calculate how many points a student gets according to the tutor's annotations.

## Why?
I'm trying to automate a task that is very simple using a method that is likely more complex instead of just doing it the easy way

## How to use it?
Set the max reachable points in the settings under `tutor-point-calculator.maxPoints`. It is 24 by default, because I needed that amount :P

Open a folder that contains the stuff you have to check and do your stuff. Make annotations with `// TUTOR -XY`, where `XY` can be a whole or decimal number.

When finished press `CTRL + F3` or execute the command `Calculate Points`.

You'll get a small information message, where you see the points for the student.


## TODO:
* Other formats for the annotations
* Support more files than just `*.java`