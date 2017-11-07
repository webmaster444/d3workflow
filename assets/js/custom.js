//Append svg
var svg = d3.select("#content").append("svg")    
    .attr('viewBox', '0 0 970 570')
    .append("g")
    .attr("transform", "translate(30,10)");

var jsondata = [{
  "items": {
    "1": {
      "title": "Buyer receives payment notification",
      "id": 1,
      "description": "",
      "type": "start",
      "stream": 1,
      "attachment": "http://upload1.location",
      "connectors": {
        "1": {
          "title": "",
          "type": "simple",
          "linkTo": 2
        }
      }
    },
    "2": {
      "title": "",
      "id": 2,
      "description": "",
      "type": "junction",
      "stream": 1,
      "attachment": "http://upload1.location",
      "connectors": {
        "1": {
          "title": "",
          "type": "simple",
          "linkTo": 3
        }
      }
    },
    "3": {
      "title": "Fully Paid?",
      "id": 3,
      "description": "",
      "type": "decision",
      "stream": 2,
      "attachment": "http://upload1.location",
      "connectors": {
        "1": {
          "title": "Connector 5 Name",
          "type": "simple",
          "linkTo": 4
        },
        "2": {
          "title": "Connector 4 Name",
          "type": "simple",
          "linkTo": 5
        }
      }
    },
    "4": {
      "title": "Send Invoice to Buyer",
      "id": 4,
      "description": "",
      "type": "process-simple",
      "stream": 1,
      "attachment": "http://upload1.location",
      "connectors": {
        "1": {
          "title": "",
          "type": "simple",
          "linkTo": 6
        }
      }
    },
    "5": {
      "title": "Email buyer ask for full payment",
      "id": 5,
      "description": "",
      "type": "process-simple",
      "stream": 1,
      "attachment": "http://upload1.location",
      "connectors": {
        "1": {
          "title": "",
          "type": "simple",
          "linkTo": 2
        }
      }
    },
    "6": {
      "title": "Send Shipment notice to Buyer",
      "id": 6,
      "description": "",
      "type": "finish",
      "stream": 1,
      "attachment": "http://upload1.location",
      "connectors": {}
    }
  },
  "streams": {
    "1": {
      "id": 1,
      "title": "HR Staff",
      "order": "1"
    }
  }
}];

var defColor = '#337ab7';
var priColor = '#f0ad4e';
for(index in jsondata[0].items){    
    var item = jsondata[0].items[index];
    if(item.type=='start'){
        drawRoundRect(svg,30,30,120,40,item.title,defColor);
        svg.append("path")
        .attr("d", drawArrow(153, 50, 45));            
    }
    if(item.type=='junction'){
        drawJunctionOperator(svg,200,35,defColor,15);
        svg.append("path")
        .attr("d", drawArrow(238, 50, 52));
    }

    if(item.type=='decision'){
        drawRotatedRoundSquare(svg,260,40,60,defColor,5,item.title);
        svg.append("path").attr("d", drawArrow(383, 50, 50));
        svg.append("path").attr("d", drawArrow2(340, 95, 340,120));        
    }

    if(item.type=='process-simple'&& item.id==4){        
        drawRect(svg,440,30,120,40,defColor,item.title);
        svg.append("path")
        .attr("d", drawArrow(563, 50, 70));
    }

    if(item.type=='process-simple'&& item.id==5){        
        drawRect(svg,280,130,120,40,defColor,item.title);
        svg.append("path")
            .attr("d", drawArrow3(275, 150, 215,75));
    }

    if(item.type=='finish'){        
        drawRoundRect(svg,640,30,120,40,item.title,priColor);
    }
}
// jsondata.items.each(function(d){

// })

//draw rectangle
function drawRect(container, x,y, width, height,color,text){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });;
    var res = g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr('stroke', color);    

    res += g.append("text").text(text).attr('x',width/2).attr('y',height/2).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);
}

//draw rounded rectangle
function drawRoundRect(container, x, y, width, height, text,color, rx){
    if(rx==''||rx==undefined){
        rx = 3;
    }
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });
    var res =  g.append("rect")
        .attr('ry',rx)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr('stroke', color);   
    res += g.append("text").text(text).attr('x',width/2).attr('y',height/2).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);

}

//draw round square and rotate
function drawRotatedRoundSquare(container, x, y, width, color, rx,text){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });
    var res =  g.append("rect")
        .attr('ry',rx)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", width)
        .attr('stroke', color)
        .attr('transform','translate(80, -30) rotate(45)');   
    res += g.append("text").text(text).attr('x',(width+95)/2).attr('y',(width/2 -15)).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);
    return res;
}

function drawJunctionOperator(container, x, y, color, rx){
    var g = container.append('g').attr('class','g_wrapper');
    g.append("circle")
        .attr('r',rx)
        .attr("cx", (x+rx))
        .attr("cy", (y+rx))        
        .attr('stroke', color);        
    g.append('line')
        .attr('x1',x+5)
        .attr('y1',y+5)
        .attr('x2',(x+2*rx -5))
        .attr('y2',(y+2*rx - 5))
        .attr('stroke',defColor)
        .attr('stroke-width','3px');

    g.append('line')
        .attr('x1',x+5)
        .attr('y1',(y+2*rx - 5))
        .attr('x2',(x+2*rx -5))
        .attr('y2',y+5)
        .attr('stroke',defColor)
        .attr('stroke-width','3px');
}
//draw arrow
function drawArrow(x, y, width) {
    var qVH = 3;
    var ahwidth = 5;
    return "M" + x + "," + y +
        "h" + (width - ahwidth) +
        "v" + (-qVH) +
        "L" + (x + width) + ',' + y +
        "L" + (x + width - ahwidth) + ',' + (y + qVH) +
        "v" + (-qVH);        
}

function drawArrow2(startX, startY, endX, endY) {
    var qVH = 3;
    var ahwidth = 5;
    return "M" + startX + "," + startY +        
        "v" + (endY-startY) +
        "h" + 5 +
        "L" + (endX) + ',' + (endY + 5) +
        "L" + (endX -5) + ',' + (endY) +        
        "h" + (5);        
}

function drawArrow3(startX, startY, endX, endY) {
    var qVH = 3;
    var ahwidth = 5;
    return "M" + startX + "," + startY +        
        "h" + (endX-startX) +
        "v" + (endY-startY) +
        "h" + (-5) +
        "L" + (endX) + ',' + (endY -5) +
        "L" + (endX+5) + ',' + (endY) +
        "h" + (-5);
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
        x = text.attr('x'),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}