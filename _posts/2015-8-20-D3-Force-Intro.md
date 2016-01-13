---
layout: post
title: Using forces in D3.js
---

I've said it before and I'll say it again, D3.js is an incredibly powerful tool that makes you look like a web development gangsta! If you would like to add a new trick to your D3 tool belt, follow me on a magical journey through the world of forces.

<svg></svg>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
<script src="../scripts/d3ForceDemo.js"></script>

The demo above shows D3 forces in action. Grab one of the balls and start moving it around the page! I'm going to walk you through all of the code you'll need to make one of these yourself.

Start by making a simple dataset like the one below.

  <code>

    var width = 800;
    var height = 600;

    var svg = d3.select('svg')
        .attr('height', height)
        .attr('width', width);

    var data = [{color: 'red'}, {color: 'orange'},
                {color: 'yellow'}, {color: 'green'},
                {color: 'blue'}, {color: 'purple'}];

  </code>

Our goal is to display all of these colors as circles on our webpage. Pretty typical D3 stuff so far, but by using forces we can have these circles move themeselves into a group. Now we're talking! Let's create the force that will move these data circles closer together. Fun fact: by creating this force, we are actually mutating our data array. Each data object with now have a few extra values properties, like "x" and "y", that are used by force to move them around the page.

  <code>

    var force = d3.layout.force()
        .nodes(data)
        .size([width, height])
        .gravity(.02)
        .charge(0)
        .on("tick", tick)
        .start();

  </code>

The most important thing to note is the above is the tick function. Tick will be shown below and is simply the function that is called during every frame of the animation.

Next let's use some of our d3 skills to place our circles on the screen.

  <code>

    var radius = 30;
    var circles = d3.selectAll('circle')
        .data(data)
      .enter().append('circle')
        .style('fill', function(d) {
            return d.color;
          })
        .attr('r', function(d) {
            d.r = radius;
            return radius;
          })
        .call(force.drag);

  </code>

Notice the call method being used on the circles. This is where we actually start to apply the force to the circles. We are also attaching an "r" property to each piece of data that we have. When we use forces to move our data, it is the data that is directly moving, not the svg circle elements. Therefore, in order to incorporate collision detection, the data must have the radius of the circle it is related to.

Our final step is to create the tick function that we used before. This is where we will be applying our circle collision. If we didn't add this part, our circles would all cluster together in the middle of the screen.

  <code>

    function tick(e) {

      circles
          .each(collide(.5))
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

  </code>

Now before you scream "This is waaaay easy" and stop reading, we've got one more function to write: the collision function itself. This function is going to determine whether or not a collision between two pieces of data has occurred at any given moment.

  <code>

    function collide(alpha) {
      var quadtree = d3.geom.quadtree(data);
      return function(d) {

        // get maximum distances of collision
        var r = d.r + 10,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;

        // check only close data for collisions
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.r + quad.point.r;

            // check if data points are overlapping
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }

  </code>

Alright, I know... this collide function is pretty complicated. Honestly, it's not too bad, but requires some knowledge about quad trees and patience to work you way through. For now, I recommend that you copy and paste in and explore it at your own leisure.

If you really must know how this thing works, then listen up! All our data is first put into a quad tree. For each piece of data, we find the maximum distances that we would have to check for collisions, which we store in a bunch of variables: "nx1", "nx2", "ny1", "ny2". The naive approach at this point would have us check every two pieces of data for a collision. The nature of quad trees allows us to eliminate all data that is too far away to possibly cause a collision from this process expensive process. We then simply check if the data points are overlapping. If they are we bounce the two pieces of data off each other with a strength proportional to "alpha".

Give this code a try yourself, or click here to see it in action yourself. The result is pretty neat, and can be easily combined with a bunch of other D3 magic for interesting data visualization.
