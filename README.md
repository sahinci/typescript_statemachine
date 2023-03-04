# Sample state machine with TypeScript
# OOP, Unit tests with JEST
The main purpose of this repository to learn and try out TypeScript capabilities. 
In this example, I implemented a generic State Machine.
You can use this generic state machine in your individual or commercial projects. Or only you can investigate to get some kind of idea. 
State machines are everywhere in our life. Coffee machine, kitchen Owens, traffic lights, atm s and many.
You can learn more about on the https://statecharts.github.io/what-is-a-state-machine.html

# Little technical details
In this example especially I tried to write code with object-oriented and TDD way. 
I used some kind patters like builder, factory, state and I used enum and interfaces, generics etc ...
The most important thing you can write Unit tests on this code with Jest test framework. 
I tried to keep it simple. But briefly, I understood TypeScript is an awesome programming language which built on JavaScript.
You can use it in your big projects with trust. It keeps your code clean, easy maintainable and testable.

# Phone Call state handling
In this example I defined my call management states and transitions in enums.
Then I configured my state machine.
Then in unit tests I executed state machine and fired with transitions.
As i said before this is a generic State Machine so you can define your enums for an other purposes. And  you can configure state machine as you wish. Then you can execute with transitions. 

This is a similar design of my state machine. It is not exactly same but it is possible to this. 
![Sample State Machine Image](https://www.researchgate.net/profile/Keshav_Dahal/publication/226462294/figure/fig4/AS:302286770327553@1449082190385/The-telephone-system-state-machine-diagram.png)


Some steps for make up and running local dev environment.
//install lite server an typescript with npm            npm install lite-server typescript --save-dev
//install jest                                          npm i --save-dev @types/jest


start debugging
npx lite-server -----this will start a server which run on localhost:3000 on browser. You can debug only via 
browser not on the vscde 

For debug in vscode: paste this in package.json file 
// "type": "module"  
use this only if you want to start debugger via vscode, but it is not related with debugger will not behave like something trigged via browser. 
Only entry point debugger file of project and callers trigging(in this case app.ts).
Be aware If you use this type:module then jest unit tests will not run. That is something that I need investigate.  


Happy Coding :)
Sahin Deligoz
