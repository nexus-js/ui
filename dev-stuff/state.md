This is a quick note to the community about the future of this project — 

I have let the project stagnate a bit for several reasons    . However, I am in a position now to be able to give the project the maintenance that it deserves.

This update will involve a few changes in its design.







I'm currently writing an update to NexusUI, in order . This update is motivated by several changes in use patterns of this project. 

- The library will be explicitly focused on integrating with web audio, rather than communicating with other audio engines (Max/MSP, libPD) via network protocols, although that will still be possible..

- The library will be designed for developers to include it in larger projects. It will no longer expect to be in a standalone page. (Yes this should have happened long ago, and, again, I'm sorry that it hasn't yet.)

  ​

With the rise of web audio in the last few years, the use of the library has really transformed. Since graduating, I have not been keeping the library up-to-date with those changes. But I think now is the time to reconsider the scope of the library and many of its core features.





I am updating / rewriting the library to focus on web audio applications. It will be designed to fit one of its most common current uses — as a toolkit to help build interactive web audio instruments.

*( Can it still be used as a mobile interface for Max projects, communicating via OSC? Yes, and we'll have updated templates for that ability. But the standard design patterns will assume an integration with web audio. )*







In some ways, this will not be all that different from how it is now. But there will be key differences:

- SVG graphics instead of canvas graphics
- More conventional Javascript API (no global variable declarations)
- Revised interfaces, focused on music and functionality rather than experimentation
  - Fewer interfaces; more customization and settings within those interfaces
- Revised docs format with more code examples and tutorials
- More accurate timing methods and ability to hook into external timing tools
- ES6 (babel/webpack)




Also, a few additional new aspects of the library --

- A few methods for handling scales / tuning (but not a full Teoria competitor)

- Ability to 'sync' the value of two elements (such as a slider and a number)

  ​



This revision is about 50% complete. I don't want to put a release date here but I certainly hope to make it live in the next month or two.

So, what does this mean for NexusUI now? For existing bugs (of which there are many), I am focusing on fixing them in this update. For quick fixes, I will still do my best to post patches.





 

















=== cut



I never expected this project to see hundreds of daily visitors.



Leading the development of this project has taught me a ton. I realize now how little I knew when I set out to develop the project. I finally feel I'm at a point where I understand what it requires to create a project which is widely used.





With web audio taking off as it is, that has really changed. 





As the project has iterated, I have learned so much and am starting to see where this project should go to fit the needs of its users.







Sharing a quick note about NexusUI and its future --







