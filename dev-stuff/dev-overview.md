## To get up and running as a developer of this project

You'll need to install:

- Webpack: `sudo npm install -g webpack`
- Possibly more? Let me know if you get any errors while proceeding.

Clone the repository. In Terminal, navigate to the folder containing the project. 

Run `npm install`

Then run `npm start` to begin the build script that will run while you develop. It will re-build on each save.

The build script also runs jshint which will give you specific information on syntax errors — really any JavaScript not conforming to strict ES6. I usually get about a half dozen warnings per save, so don't feel bad when you experience the same.

Right now there is one standing warning about using `eval` in one location. It is on my to-do list to replace eval, but I haven't yet figured out how to write a better solution.



## Overview

Three main aspects of this project:

- Interfaces (huge, maybe 40% done)
- Tuning (small, pretty much done)
- Timing (small, pretty much done)

There are a few other categories within the project, most importantly:

- Models — these are JS Objects (classes) which are purely abstract implementations of common needs. So like the Toggle Model is a Class that has a boolean value property, and a few methods like .on(), off(), flip(). The Toggle Model is used throughout the project whenever I need an interactive binary state. It is better than writing if (value==true) then value = false, else etc, every time.



## What can you do?

Some options --

- Work on the models. I've only written about half of them. This would be a huge time saver, and is a relatively independent endeavor b/c they're purely abstract. Completion levels:
  - Counter: 90% 
    - Its 'drunk' mode should be hooked up to the drunk model once that's created
    - It should have a 'pattern' mode that lets you give it a series of values to iterate through
  - Drunk: 0%
    - You can guess what this does
  - Matrix: 70%
    - Several methods still missing — this is one of the main compositional tools of the library, so I'm trying to give it some features.
  - Radio (as in radio button): 0% 
  - Range (as in range slider): 30%
  - Step: 100%
  - Toggle: 100%
- Convert the audio visualization interfaces. I wrote them in standalone HTML files. They need to be turned into interfaces within the project, following the same pattern as the other interfaces (a class, in its own file, that inherits from `/core/interface.js`, and can be created in the same way that other interfaces are created.)
- There are more interfaces that I haven't started yet. You could implement any of them, following the pattern already established. They are:  **Tilt**, **Pan**, **Multislider**, **Envelope**, **TextRadio**, **Transport**. I have graphic designs for some of them already, which I can send you.



## So

Pick what you think would be most interesting for you. Whatever you choose, I can give you more info.

And, if after all this you decide to work on Grapph instead, that's all right too : )



 

