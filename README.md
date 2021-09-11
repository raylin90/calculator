# built a basic calculator that performs _add subtract multiply divide_ function

1. used HTML as the view page for all the buttons and display
2. used CSS for styling: 
    * CSS reset to keep our designs consistent from different browser 
    * CSS grid & flex to position out buttons and display
3. used DOM Manipulation in Vanilla JS to compute and display

### What I learned:
1. I learned CSS Grid as first time, as it's very cool tool to position out 2-D layout by changing it's columns and rows
2. deeper understanding of DOM Manipulation, on how data transfer from HTML to JS and vice versa

### What's the difficulty I had:
It was a lot more complicated than I imagined in the first place. Instead of just getting the number and performing the computation. We need to consider many edge cases like: 
1. The front display is string, and backend we need to treat it as float 
2. if the user didn't enter anything, and wants to perform the computation 
3. what if the user enters decimal first without pressing the 0 
4. what if user entered decimal multiple times

The biggest issue I faced was trying to make the number look nicer. For example: put a comma , to separate the number in every three digits like 1,000 instead of displaying 1000. Instead of applying it directly (using built-in `toLocaleString`) I had some issues when facing the decimal. So I need to split the number into an integer and decimal part, then apply `toLocaleString` on the integer part then concatenate back for display on the front end