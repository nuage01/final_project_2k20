var svg = dimple.newSvg("#chartContainer",1450, 400);
     d3.csv("/static/data/topics_negatives.csv", function (data) {

     svg.append("rect")
       .attr("x", "8px")
       .attr("y", "8px")
       .attr("width", "100%")
       .attr("height", "100%")
       .style("fill", "snow");
 
       // Configure a simple bar chart
       var myChart = new dimple.chart(svg, data),
           xAxis = myChart.addCategoryAxis("x", "category"),
           yAxis = myChart.addMeasureAxis("y", "measure"),
           mySeries = myChart.addSeries("Total", dimple.plot.bar);
 
       // Draw without any axes
       xAxis.hidden = true;
       yAxis.hidden = true;
 
       // Set small margins as there is going to be no axes displayed
       myChart.setMargins(14, 18, 6, 10);
 
       // Define a custom color palette.  These colours are based on the excellent
       // set at http://flatuicolors.com/
       myChart.defaultColors = [
         //  new dimple.color("#3498db", "#2980b9", 1), // blue
           new dimple.color("#e74c3c", "#c0392b", 1), // red
           new dimple.color("#2ecc71", "#27ae60", 2), // green
            new dimple.color("#9b59b6", "#8e44ad", 3), // purple
           new dimple.color("#e67e22", "#d35400", 4), // orange
           new dimple.color("#f1c40f", "#f39c12", 1), // yellow
           new dimple.color("#1abc9c", "#16a085", 1), // turquoise
           new dimple.color("#95a5a6", "#7f8c8d", 1)  // gray
 
       ];
 
       mySeries.afterDraw = function (s, d) {
 
         //   use the golden ratio for the width
         var shape = d3.select(s),
             goldenRatio = 1.61803398875;
 
         // Add a rectangle to the bar giving a nice style.  The idea was borrowed
         // from sirocco's question here:
         // http://stackoverflow.com/questions/25044608/dimplejs-barchart-styling-columns
         svg.append("rect")
           .attr("x", shape.attr("x"))
           .attr("y", shape.attr("y"))
           .attr("height", shape.attr("height"))
           .attr("width", (0.5 * shape.attr("width")) / goldenRatio)
         .style("fill", shape.style("stroke"))
      
           .style("opacity", 3)
           .style("pointer-events", "none");
 

         svg.append("text")
           .attr("x", parseFloat(shape.attr("x")) + shape.attr("width") / 2)
           .attr("y", parseFloat(shape.attr("y")) + (shape.attr("height") > 30 ? (shape.attr("height") / 2 + 8) : - 10))
           .style("font-family", "courier new")
           .style("text-anchor", "middle")
           .style("font-size", "16px")
           .style("fill", "#ecf0f1")
           .style("pointer-events", "none")
           .text(yAxis._getFormat()(d.yValue));
 

         shape.attr("stroke", shape.attr("fill"));
 
       };
 

       mySeries.addEventHandler("mouseover", function (e){
 
         // Draw the text information in the top left corner
         svg.selectAll(".dimple-hover-text")
           .data([e.xValue, d3.format(",.0f")(e.yValue)])
       
             .enter()
             .append("text")
             .attr("class", "dimple-hover-text")
             .attr("x", myChart._xPixels()  + myChart._widthPixels() - 25)
             .attr("y", function (d, i) { return myChart._yPixels() + 20 + i * 25; })
             .style("font-family", "courier new")
             .style("text-anchor", "end")
             .style("font-size", "25px")
             .style("fill", "black")
             .style("pointer-events", "none")
             .text(function (d) { return d; });
 
         // Put a coloured bar next to the text for no good reason
         svg.append("rect")
           .attr("class", "dimple-hover-text")
           .attr("x", myChart._xPixels() + myChart._widthPixels() - 15)
           .attr("y", myChart._yPixels())
           .attr("height", 60)
           .attr("width", 20)
           .style("fill", "RED")
           .style("opacity", 1)
           .style("pointer-events", "none");
 
       });
 

       mySeries.addEventHandler("mouseleave", function (e) {
         svg.selectAll(".dimple-hover-text").remove();
       });

       myChart.draw();
 
     });