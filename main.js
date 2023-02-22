const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = 50

var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");


var div = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);

d3.csv("../data/bar-data.csv").then(function (data) {

    xScale.domain(data.map(function (d) { return d.category; }));
    yScale.domain([0, d3.max(data, function (d) { return d.amount; })]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        }).ticks(10));


    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "d3-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("padding", "15px")
        .style("background", "rgba(0,0,0,0.6)")
        .style("border-radius", "5px")
        .style("color", "#fff")

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.category) })
        .attr("y", function (d) { return yScale(d.amount) })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.amount); })
        .on("mouseover", function (d, i) {
            d3.select(this).attr("class", "highlight");
            tooltip.html(`Amount: ${d}`).style("visibility", "visible");
        })
        .on("mousemove", function (d) {
            tooltip
                .style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () {
            d3.select(this).attr("class", "bar");
            tooltip.html(``).style("visibility", "hidden");
        });



});

// Call function 
build_interactive_plot();