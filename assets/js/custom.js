//Append svg
var svg = d3.select("#content").append("svg")
    // .attr("width", 970)
    // .attr("height", 820)
    .attr('viewBox', '0 0 970 570')
    .append("g")
    .attr("transform", "translate(30,10)");


//Wrapper Rect
var rect = svg.append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("x", -20)
    .attr("y", 10)
    .attr("width", 950)
    .attr("height", 520)
    .attr('stroke', '#000');

for (var i = 0; i < 4; i++) {
    var g_flow_wrapper = svg.append('g').attr('transform', function() {
        return "translate(" + i * 230 + ", 0)";
    })
    //Append Arrow
    rect = g_flow_wrapper.append("path")
        .attr("d", drawArrow(0, 100, 100, 100, 50))
        .style('stroke', '#c60d16');

    //Append Wrapper Rect
    rect = g_flow_wrapper.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 110)
        .attr("y", 30)
        .attr("width", 110)
        .attr("height", 250)
        .attr('stroke', '#000');

    //Apend sub rects.
    rect = g_flow_wrapper.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 120)
        .attr("y", 40)
        .attr("width", 90)
        .attr("height", 70)
        .attr('class', 'end_item');

    rect = g_flow_wrapper.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 120)
        .attr("y", 120)
        .attr("width", 90)
        .attr("height", 70)
        .attr('class', 'end_item');

    rect = g_flow_wrapper.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 120)
        .attr("y", 200)
        .attr("width", 90)
        .attr("height", 70)
        .attr('class', 'end_item');
}

var clrm_payloading_texts = ['CLRM Landing Area for XML Files', 'ODS Acknowledgement', 'Access Layer Completion', "Acknowledgement to Source"];
var clrm_paylaoding_title = 'CLRM Payload Processing';
//CRM PAYLOAD PROCESSING SECTION
var payload_g_wrapper = svg.append('g').attr('class', 'payload_wrapper').attr("transform", "translate(0,350)");
payload_g_wrapper.append("text")
    .attr("x", 10)
    .attr("y", 20)
    .attr("dy", ".35em")
    .text(clrm_paylaoding_title);
//Append container rect
var payload_g_wrapper_rect = payload_g_wrapper.append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("x", 0)
    .attr("y", -50)
    .attr("width", 910)
    .attr("height", 100)
    .attr('stroke', '#000');


//Append 4 arrows and rects

    var g_w = payload_g_wrapper.selectAll('.g_wrapper').data(clrm_payloading_texts).enter().append('g').attr('class', 'g_wrapper').attr('transform', function(d,i) {
        return "translate(" + parseInt(i * 220 + 15) + ", 0)";
    });

    rect = g_w.append("path")
        .attr("d", drawArrow(0, -10, 100, 20, 10))
        .style('fill', '#000')
        .style('stroke', '#000');

    var rect_wrapper = g_w.append('g');
    rect = rect_wrapper.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 105)
        .attr("y", -40)
        .attr("width", 110)
        .attr("height", 80)
        .attr('class', 'end_item');
    
    rect_wrapper.append("text")
      .attr("x", 205)
      .attr("y", 30)
      .attr("dy", ".35em")
      .text(function(d) { return d; })
      .call(wrap, 110);



var g_wrapper = svg.append('g').attr('class', 'payload_wrapper').attr("transform", "translate(0,460)");
for (var j = 0; j < 2; j++) {
    var g_left = g_wrapper.append('g').attr('transform', function() {
        return "translate(" + j * 480 + ",0)";
    });
    var g_left_rect = g_left.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", 0)
        .attr("y", -50)
        .attr("width", 450)
        .attr("height", 100)
        .attr('stroke', '#000');

    var g_lr = g_left.append('g').attr("transform", "translate(230,0)");;
    var g_left_rect = g_lr.append("rect")
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("x", -10)
        .attr("y", -40)
        .attr("width", 220)
        .attr("height", 80)
        .attr('stroke', '#000');

    for (var i = 0; i < 3; i++) {
        var rect = g_lr.append("rect")
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("x", function() {
                return i * 67;
            })
            .attr("y", -30)
            .attr("width", 65)
            .attr("height", 60)
            .attr('class', 'end_item');
    }
}

// Returns path data for a rectangle with rounded right corners.
// Note: it’s probably easier to use a <rect> element with rx and ry attributes!
// The top-left corner is ⟨x,y⟩.
function drawArrow(x, y, width, height, ahwidth) {
    var qVH = height / 4;
    return "M" + x + "," + (y + qVH) +
        "h" + (width - ahwidth) +
        "v" + (-qVH) +
        "L" + (x + width) + ',' + (y + height / 2) +
        "L" + (x + width - ahwidth) + ',' + (y + height) +
        "v" + (-qVH) +
        "H" + (x) +
        "z";
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