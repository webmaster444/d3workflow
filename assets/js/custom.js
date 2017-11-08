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
var linksData = [];
d3.json('assets/jsondata.json',function(data){    
    itemsData = data[0].items;
    parseJson(itemsData);
    drawElement(0,40,itemsData[currentStep], currentStep);
    drawLinks(itemsData);
})

//draw rectangle
function drawRect(id, x,y, width, height,color,text){
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+width).attr('endY',y+height);
    var res = g.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr('stroke', color);    

    res += g.append("text").text(text).attr('x',width/2).attr('y',height/2).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);
}

//draw rounded rectangle
function drawRoundRect(id, x, y, width, height, text,color, rx){
    if(rx==''||rx==undefined){
        rx = 3;
    }
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+width).attr('endY',y+height);
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
function drawRhombus(id, x, y, width, color, rx,text){
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+2*width).attr('endY',y+width);    
    var res =  g.append("polygon")
        .attr('points',function(){
            return 0 +',' + defElHeight/2 + ' ' + width + ',' + (-width+defElHeight/2) + ' ' + (2*width) + ',' + defElHeight/2 + ' ' +width +',' + (width+defElHeight/2)
        })
        .attr('stroke', color)
        .attr('fill','white');

    res += g.append("text").text(text).attr('x',width).attr('y',defElHeight/2).attr('text-anchor','middle').attr('dy','.1em').call(wrap,width);
    return res;
}

function drawOrSplitOperator(id, x, y, color, rx){
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+rx).attr('endY',y+rx);
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

function drawJunctionOperator(id, x, y, color, rx){
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+2*rx).attr('endY',y+rx);
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

function drawConnectorOperator(id, x, y, color, rx, text){
    var g = svg.append('g').attr('id','item'+id).attr('class','g_wrapper').attr('transform',function(){
        return "translate("+x+","+y+")";        
    }).attr('startX',x).attr('startY',y).attr('endX',x+2*rx).attr('endY',y+rx);
    g.append("circle")
        .attr('r',rx)
        .attr("cx", rx)
        .attr("cy", rx/2)        
        .attr('stroke', color);        
    g.append("text").text(text).attr('x',rx).attr('y',rx/2).attr('text-anchor','middle').attr('dy','.1em').call(wrap,2*rx);
}
//draw arrow
function drawArrow(x, y, nX,nY) {
    var qVH = 3;
    var ahwidth = 5;
    return "M" + x + "," + y +
        "h" + (nX- x - ahwidth) +
        "v" + (-qVH) +
        "L" + (nX) + ',' + y +
        "L" + (nX - ahwidth) + ',' + (parseInt(y) + qVH) +
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

function selectArrow(startX,startY,endX,endY){
    if(startY == endY){
        if((endX - startX) > 2* defElWidth){

        }else{

            return drawArrow(startX,startY,endX,endY);
        }
    }

    if(startX == endX){
        return drawArrow2(startX,startY,endX,endY);
    }

    if((endX < startX) && (endY < startY)){
        console.log('3333');
        return drawArrow3(startX,startY,endX,endY);
    }
}

function drawElement(startX,startY,data,step){  
    drawedItemsArray.push(step);
    // step++;        
    switch(data.type) {
        case 'start':
            drawRoundRect(data.id,startX,startY,defElWidth,40,data.title,defColor);
            break;
        case 'finish':
            drawRoundRect(data.id,startX,startY,defElWidth,40,data.title,priColor);
            break;
        case 'process-simple':
            drawRect(data.id,startX,startY,defElWidth,40,defColor,data.title);    
            break;
        case 'decision':
            drawRhombus(data.id,startX,startY,50,defColor,5,data.title);   
            break;        
        case 'connector-start':
            drawConnectorOperator(data.id,startX,startY,defColor,40,data.title)     
            break;          
        case 'connector-end':
            drawConnectorOperator(data.id,startX,startY,priColor,40,data.title)     
            break;            
        case 'or-split':
            drawOrSplitOperator(data.id,startX,startY,defColor,20);                
            break;          
        case 'junction':
            drawJunctionOperator(data.id,startX,startY,defColor,20);            
            break;  
        default:
            break;
    }     

    
    if(Object.keys(data.connectors).length == 2){
        nextX = startX;
        nextY = startY + 120;
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

function drawLinks(itemsData){    
    for(index in itemsData){            
        for(connector in itemsData[index].connectors){
            var fromId = itemsData[index].id;
            startX = d3.select('#item'+fromId).attr('endX');
            startY = d3.select('#item'+fromId).attr('startY');
            var toId = itemsData[index].connectors[connector].linkTo;
            endX = d3.select('#item'+toId).attr('startX');
            endY = d3.select('#item'+toId).attr('startY');            
            // endY = d3.select('#item'+toId).attr('startY');
            svg.append('path').attr("d",selectArrow(startX,startY,endX,endY)).attr("fill", "none");
        }
    } 
}