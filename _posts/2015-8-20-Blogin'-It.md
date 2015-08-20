---
layout: post
title: Using forces in D3.js
---

I've said it before and I'll say it again, D3.js is an incredibly powerful tool that makes you look like a web development gangsta! If you would like to add a new trick to your D3 toolbelt, follow me on a magical journey through the world of forces.

Try making a simple dataset like the one below.

  <code>
  
    var data = [{color: 'red'}, {color: 'orange'}, 
                {color: 'yellow'}, {color: 'green'}, 
                {color: 'blue'}, {color: 'purple'}];

  </code>

Our goal is to display all of these colors as circles on our webpage. Pretty typical D3 stuff so far, but by using forces we can have these circles move into a group. Now we're talking! Let's create the force that will move these data circles closer together. Fun fact: by creating this force, we are actually mutating our data array. Each data object with now have a few extra values properties, like 'x' and 'y', that are used by force to move them around the page.

  <code>

    var force = d3.layout.force()
        .nodes(data)
        .size([width, height])
        .gravity(.02)
        .charge(0)
        .on("tick", tick)
        .start();

  </code>

The most imporant thing to note is the above is the tick function. Tick will be shown below and is simply the function that is called during every frame of the animation.

Next let's use some of our d3 skills to place our circles on the screen.

  <code>

    var circles = d3.selectAll('circle')
        .data(data)
      .enter().append('circle')
        .style('fill', function(d) {
            return d.color;
          })
        .attr('r', 30)
        .call(force.drag);

  </code>

Notice the call method being used on the circles. This is where we actually start apply the force to the circles. Our final step is to create the tick function that we used before. This is where we will be applying our circle collision. If we didn't add this part, our circles would all cluster together in the middle of the screen.

  <code>

    function tick(e) {

      circles
          .each(collide(.5))
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });          
    }

    function collide(alpha) {
      var quadtree = d3.geom.quadtree(data);
      return function(d) {
        var r = d.radius + 10,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + quad.point.radius;
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

Alright, I know. This collide function that we are using is pretty complicated. Honestly, it's not too bad, but requires some knowledge about quadtrees to use. Copy and paste into your code and explore it at your leasure. Enjoy playing around with D3 forces.