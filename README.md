# Basic Calculator 
allow users to perform simple _add subtract multiply divide_ function

### Tech/framework used
------------------
__Built with__
- HTML: view page for all the buttons and calculator display
- CSS: CSS reset to keep our design consistent from different browser & grid / flex to position out buttons and display
- DOM Manipulation: Vanilla JS to compute and display

### Spotlights:
------------------
1. I learned CSS Grid for the first time, as it's a very cool tool to position out 2-D layout by changing it's columns and rows
2. deeper understanding of DOM Manipulation, on how data transfer from HTML to JS and vice versa

### Difficulties:
------------------
It was a lot more complicated than I imagined in the first place. Instead of just getting the number and performing the computation. We need to consider many edge cases like: 
1. The front-end display is string, but on the back-end we need to treat it as float 
2. if the user didn't enter anything, and wants to perform the computation 
3. what if the user enters decimal first without pressing the 0 
4. what if user entered decimal multiple times

The biggest issue I faced was trying to make the number look nicer. For example: put a comma , to separate the number in every three digits like 1,000 instead of displaying 1000. Instead of applying it directly (using built-in `toLocaleString`) I had some issues when facing the decimal. So I need to split the number into an integer and decimal part, then apply `toLocaleString` on the integer part then concatenate back for display on the front end

### Installation
------------------
```
# Clone this repository
$ git clone https://github.com/raylin90/calculator.git

# Go into the repository
$ cd calculator

# Open in your editor
$ code . (I use VS Code, so it's the shortcut terminal command

# Run the app, by right click html file, and open in your browser
```
