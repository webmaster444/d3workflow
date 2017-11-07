//Append svg
var svg = d3.select("#content").append("svg")    
    .attr('viewBox', '0 0 970 570')
    .append("g")
    .attr("transform", "translate(30,10)");

drawRotatedRoundSquare(svg,40,30,30,'black',1);
drawRect(svg,80,30,30,40,'black',1);
drawRoundRect(svg,120,30,30,40,'black',1);
drawArrow(1,1,30,10,5);

rect = svg.append("path")
        .attr("d", drawArrow(0, 100, 100, 0, 3))

//draw rectangle
function drawRect(container, x,y, width, height,color){
    var g = container.append('g').attr('class','g_wrapper');
    return g.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr('stroke', color);    
}

//draw rounded rectangle
function drawRoundRect(container, x, y, width, height, color, rx){
    var g = container.append('g').attr('class','g_wrapper');
    return g.append("rect")
        .attr('ry',rx)
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr('stroke', color);   
}

//draw round square and rotate
function drawRotatedRoundSquare(container, x, y, width, color, rx){
    var g = container.append('g').attr('class','g_wrapper');
    return g.append("rect")
        .attr('ry',rx)
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", width)
        .attr('stroke', color)
        .attr('transform','rotate(45)');   
}
//draw arrow
function drawArrow(x, y, width, height, ahwidth) {
    var qVH = 3;
    var ahwidth = 5;
    return "M" + x + "," + y +
        "h" + (width - ahwidth) +
        "v" + (-qVH) +
        "L" + (x + width) + ',' + y +
        "L" + (x + width - ahwidth) + ',' + (y + qVH) +
        "v" + (-qVH);        
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}