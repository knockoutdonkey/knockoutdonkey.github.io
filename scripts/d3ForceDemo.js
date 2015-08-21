var width = 800;
var height = 600;

var svg = d3.select('svg')
    .attr('height', height)
    .attr('width', width)

var data = [{color: 'red'}, {color: 'orange'}, 
            {color: 'yellow'}, {color: 'green'}, 
            {color: 'blue'}, {color: 'purple'}];

var force = d3.layout.force()
    .nodes(data)
    .size([width, height])
    .gravity(.04)
    .charge(0)
    .on("tick", tick)
    .start();

var radius = 30;
var circles = svg.selectAll('circle')
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

function tick(e) {

  circles
      .each(collide(.2))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });          
}

function collide(alpha) {
  var quadtree = d3.geom.quadtree(data);
  return function(d) {
    var r = d.r + 10,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.r + quad.point.r;
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
