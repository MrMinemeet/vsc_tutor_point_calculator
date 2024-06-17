:warning: This extension will not be maintained anymore after this commit. Therefore, the final version of this extension from this repository will be `0.18.1`. If you want to take over, feel free to fork it. :warning:

# Tutor Point Calculator
This Extension should calculate how many points a student gets according to the tutor's annotations.

## Why?
I'm trying to automate a task that is very simple using a method that is likely more complex instead of just doing it the easy way

## How to use it?
Set the max reachable points in the settings under `tutor-point-calculator.maxPoints`. It is 24 by default, because I needed that amount :P
By default it checks in `.java`, `.cs`, `.ts`, `.js`, but more can be added in `tutor-point-calculator.filesToCheck`. 

Open a folder that contains the stuff you have to check and do your stuff. Make annotations with `// TUTOR -XY`, where `XY` can be a whole or decimal number.

When finished press `CTRL + F3` or execute the command `Calculate Points`.

You'll get a small information message, where you see the points for the student.

## Installation:
You can either download it from the Marketplace [HERE](https://marketplace.visualstudio.com/items?itemName=MrMinemeet.tutor-point-calculator).
Or directly download the latest .vsix file [HERE](https://github.com/MrMinemeet/vsc_tutor_point_calculator/releases/latest)


## TODO:
* Other formats for the annotations. Important for checking languages that don't use double slash as a comment
