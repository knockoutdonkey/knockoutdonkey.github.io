---
layout: post
title: An implementation of Conway's Game of Life with D3.js
---

When it comes to processing and displaying data, the D3 library is king. However, when I frist started using D3, I wasn't quite sure how to apply it to rendering a live, changing dataset. One design pattern, which I have found pretty much essential, is called the General Update Patern.

In concept, the General Update Patern works by applying two steps over and over: update and then render your data. Say you have an array of integers and would like to make a bar graph that changes when each number changes. The "update" step is simply when you change each number to its new value. The "render" step takes each one of those values and renders them onto the web page. Every time you change data with update, you follow up by rendering that new data immediatly. The beauty of the General Update Pattern, is that it completely seperates your data from your visual processing. Think of it like mini-MVC.

A good example of this can be seen in this [implementation](http://knockoutdonkey.github.io/game_of_life/) of Conway's Game of Life that I made a few weeks back. I've always loved this game, even though it can be explained by only two rules. 1: A "live" square dies if there is more than three or less than two "live" squares around it (think of this as dying of over-crowding or loneliness). 2: A "dead" square comes to life if there are exactly three live squares around it. Try pressing the randomize button in the corner and watch the game come to life!

During each turn of the game, the game updates the board by killing or bring squares to life and renders the board using D3.

D3 continues to amaze me with it's power and ease of use. If you are interesting in data visulization, I strongly reccomend giving D3 a shot!