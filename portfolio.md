---
layout: page
title: Portfolio
permalink: /portfolio/
---

## HexForce


HexFore, a turn-based strategy game on hexagonal tiles, aiming to bring compelling, strategic gameplay to a mobile market

I lead our team as the head game designer and programmer, while my partner, Christian Lee, created the art assets and collaborated on game design.

This game began with a series of prototypes quickly developed using the Love2D game engine with Lua. In order to allow accessible game modification for my non-techincal partner and convenient deployment to both Android and iOS, we selected Unity as our game engine. I take incredible pride in my robust turn-based AI system. It allows AI controlled units to have a huge variety of attacks and the ability to avoid poor map positioning while attempting to maximize damage. This project also necessitated a fast, easy-to-use level editor, which I built in-engine for the 100+ levels that are avaliable.

The menu systems and unit controls were all designed and implemented by me and were designed to be intutive for a casual gaming audience.

<div>
  <img src="/images/HexForce2.png">
  <img src="/images/HexForce1.png">
  <img src="/images/HexForce3.png">
</div>

## Endure

[Endure](http://endure.site/), a 2D exploration, adventure game inspired by Zelda.

As product owner, I was responsible for the high level design of most of the core game mechanics and balance of the enemies and upgrades. I implemented the map generation myself using a combination of Perlin noise, Vernoi diagrams and some recursive algorithms of my own design. The tool and animation systems were also created by me, as well as most of the game's art assets.

<div>
  <img src="/images/EndureBiomeMeetingPoint.png">
  <img src="/images/EndureSnowNpcs.png">
  <img src="/images/EndureFindingTreasure.png">
</div>

## SumoChicken

[Sumo Chicken](https://sumo-chicken.herokuapp.com/), a poultry-based online fighting game where you try to knock other players off the stage.

As the Product Owner and lead Gameplay Programmer of the team with the most previous game development experience, I implemented most of the gameplay features and also contributed to building out the live networking architecture.

We used the Phaser.io game engine and handled networking with the Socket.io library. On the backend we used Node and Express to create lobbies and send players game updates.

By far the most intersting challange of this project, was figuring out where to store the "source of truth" game state. The obvious approach would be to store it on the server, allowing each player to send their inputs and request the updated state. Our team discovered this wouldn't be so easy when we found out that Phaser.io requires a canvas to run. This left us with three options: scrap the client and choose a different game engine, fake the canvas on the server or run the game engine on the client. After exploring the first two options, we settled on the third. As the game is built now, each client is responsible for sending the postion and velocity of their own character to the server.

<div>
  <img src="/images/SumoChicken1.png">
  <img src="/images/SumoChicken3.png">
</div>

## Poliviz

Poliviz, a data visualization of the contributions to American political candidates. Intended to give people an easy way to explore the finincial backing of politicians.

I designed and implemented the user interface with D3.js and Angular.js. I was also the main developer and architect of the robust and flexible API routes built using Node.js and Express.js. We used D3.js for our data visulaization and Angular as our front end framework. On the backend we used a mySQL database, with a Node server. We also utilized Grunt.js to help automate our development process.

<div>
  <img src="/images/Poliviz1.png">
  <img src="/images/Poliviz2.png">
</div>
