//Append svg
var svg = d3.select("#content").append("svg")    
    .attr('viewBox', '0 0 970 570')
    .append("g")
    .attr("transform", "translate(30,10)");

var width = 970 - 30;
var height = 570 - 10;



//define global variables;
var defColor      = '#337ab7';
var priColor      = '#f0ad4e';
var totalItemsCnt = 0;
var depth         = 0;
var defElWidth    = 100;
var defElHeight   = 40;
var linkWidth     = 50;
var currentStep   = 1;
var padding       = 5;
var nextX = 0;
var nextY = 40;
var itemsData = [];
var drawedItemsArray = [];
d3.json('assets/jsondata.json',function(data){    
    itemsData = data[0].items;
    parseJson(itemsData);
    drawElement(0,40,itemsData[currentStep], currentStep);
})
// for(index in jsondata[0].items){    
//     var item = jsondata[0].items[index];
//     if(item.type=='start'){
//         drawRoundRect(svg,30,30,120,40,item.title,defColor);
//         svg.append("path")
//         .attr("d", drawArrow(153, 50, 45));            
//     }
//     if(item.type=='junction'){
//         drawJunctionOperator(svg,200,35,defColor,15);
//         drawOrSplitOperator(svg,200,175,defColor,15);
//         svg.append("path")
//         .attr("d", drawArrow(238, 50, 52));
//     }

//     if(item.type=='decision'){
//         drawRohumbus(svg,260,40,60,defColor,5,item.title);        
//         svg.append("path").attr("d", drawArrow(383, 50, 50));
//         svg.append("path").attr("d", drawArrow2(340, 95, 340,120));        
//     }

//     if(item.type=='process-simple'&& item.id==4){    
//         drawConnectorOperator(svg,260,40,defColor,40,item.title)    
//         drawRect(svg,440,30,120,40,defColor,item.title);
//         svg.append("path")
//         .attr("d", drawArrow(563, 50, 70));
//     }

//     if(item.type=='process-simple'&& item.id==5){        
//         drawRect(svg,280,130,120,40,defColor,item.title);
//         svg.append("path")
//             .attr("d", drawArrow3(275, 150, 215,75));
//     }

//     if(item.type=='finish'){        
//         drawRoundRect(svg,640,30,120,40,item.title,priColor);
//     }
// }

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
function drawRohumbus(container, x, y, width, color, rx,text){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });      
    var res =  g.append("polygon")
        .attr('points',function(){
            return 0 +',' + 0 + ' ' + width + ',' + (-width) + ' ' + (2*width) + ',' + 0 + ' ' +width +',' + width
        })
        .attr('stroke', color)
        .attr('fill','white');

    res += g.append("text").text(text).attr('x',width).attr('y',0).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);
    return res;
}

function drawOrSplitOperator(container, x, y, color, rx){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });
    g.append("circle")
        .attr('r',rx)
        .attr("cx", rx)
        .attr("cy", rx)
        .attr('stroke', color);        
    g.append('line')
        .attr('x1',0)
        .attr('y1',rx)
        .attr('x2',(2*rx))
        .attr('y2',(rx))
        .attr('stroke',defColor)
        .attr('stroke-width','3px');

    g.append('line')
        .attr('x1',rx)
        .attr('y1',0)
        .attr('x2',rx)
        .attr('y2',2*rx)
        .attr('stroke',defColor)
        .attr('stroke-width','3px');
}

function drawJunctionOperator(container, x, y, color, rx){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });
    g.append("circle")
        .attr('r',rx)
        .attr("cx", rx)
        .attr("cy", rx)        
        .attr('stroke', color);        
    g.append('line')
        .attr('x1',5)
        .attr('y1',5)
        .attr('x2',(2*rx -5))
        .attr('y2',(2*rx - 5))
        .attr('stroke',defColor)
        .attr('stroke-width','3px');

    g.append('line')
        .attr('x1',5)
        .attr('y1',(2*rx - 5))
        .attr('x2',(2*rx -5))
        .attr('y2',5)
        .attr('stroke',defColor)
        .attr('stroke-width','3px');
}

function drawConnectorOperator(container, x, y, color, rx, text){
    var g = container.append('g').attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    });
    g.append("circle")
        .attr('r',rx)
        .attr("cx", rx)
        .attr("cy", rx)        
        .attr('stroke', color);        
    g.append("text").text(text).attr('x',rx).attr('y',rx).attr('text-anchor','middle').attr('dy','.1em').call(wrap,2*rx);
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

function parseJson(jsondata){    
    totalItemsCnt = Object.keys(jsondata).length;    
    var connectorsArray = [];
    for(index in jsondata){            
        connectorsArray.push(Object.keys(jsondata[index].connectors).length);        
    }   
    depth = d3.max(connectorsArray);
    defElWidth = width / (totalItemsCnt - depth + 1) - linkWidth;        
}

function drawElement(startX,startY,data,step){  
    drawedItemsArray.push(step);
    // step++;        
    switch(data.type) {
        case 'start':
            drawRoundRect(svg,startX,startY,defElWidth,40,data.title,defColor);
            break;
        case 'finish':
            drawRoundRect(svg,startX,startY,defElWidth,40,data.title,priColor);
            break;
        case 'process-simple':
            drawRect(svg,startX,startY,120,40,defColor,data.title);    
            break;
        case 'decision':
            drawRohumbus(svg,startX,startY,50,defColor,5,data.title);   
            break;        
        case 'connector-start':
            drawConnectorOperator(svg,startX,startY,defColor,40,data.title)     
            break;          
        case 'connector-end':
            drawConnectorOperator(svg,startX,startY,priColor,40,data.title)     
            break;            
        case 'or-split':
            drawOrSplitOperator(svg,startX,startY,defColor,15);                
            break;          
        case 'junction':
            drawJunctionOperator(svg,startX,startY,defColor,15);            
            break;  
        default:
            break;
    }     

    
    if(Object.keys(data.connectors).length == 2){
        nextX = startX;
        nextY = startY + 80;
    }else{
        nextX = startX + defElWidth + linkWidth + padding;
        nextY = startY;
    }

    if(Object.keys(data.connectors).length == 1){                
        nextStep = data.connectors[1].linkTo;
        if (drawedItemsArray.indexOf(nextStep)==-1){
            drawElement(nextX, nextY, itemsData[nextStep],nextStep);        
        }                
    }    

    // svg.append("path")
        // .attr("d", drawArrow2(startX,startY,nextX,nextY));            

    if(Object.keys(data.connectors).length == 2){                
        nextStep = data.connectors[1].linkTo;
        if (drawedItemsArray.indexOf(nextStep)==-1){
            drawElement(nextX, nextY, itemsData[nextStep],nextStep);        
        }                
        nextStep = data.connectors[2].linkTo;
        if (drawedItemsArray.indexOf(nextStep)==-1){
            nextY = startY;
            nextX = startX + defElWidth + linkWidth + padding;
            drawElement(nextX, nextY, itemsData[nextStep],nextStep);        
        }
    }
}