const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };

const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 600;

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME2 = d3
  .select("#vis2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

d3.csv("data/scatter-data.csv").then((data) => {
  const MAX_X2 = d3.max(data, (d) => {
    return parseInt(d.x);
  });

  const MAX_Y2 = d3.max(data, (d) => {
    return parseInt(d.y);
  });

  const X_SCALE = d3.scaleLinear().domain([0, MAX_X2]).range([0, VIS_WIDTH]);
  const Y_SCALE = d3.scaleLinear().domain([0, MAX_Y2]).range([VIS_HEIGHT, 0]);

  FRAME2.selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      return X_SCALE(d.x) + MARGINS.left;
    })
    .attr("cy", (d) => {
      return Y_SCALE(d.y) + MARGINS.left;
    })
    .attr("r", 20)
    .attr("class", "point")
    .on("click", lastClicked);

  FRAME2.append("g")
    .attr(
      "transform",
      "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")"
    )
    .call(d3.axisBottom(X_SCALE).ticks(11))
    .attr("font-size", "20px");

  FRAME2.append("g")
    .attr("transform", "translate(" + MARGINS.right + ", " + MARGINS.top + ")")
    .call(d3.axisLeft(Y_SCALE).ticks(11))
    .attr("font-size", "20px");
});

const submitButton = document.querySelector("#submit");
const xInput = document.querySelector("#x");
const yInput = document.querySelector("#y");
const svgContainer = document.querySelector("#container");

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const x = xInput.value;
  const y = yInput.value;
  FRAME2.append("circle")
    .attr("cx", 105.55 + (x - 1) * 55.56)
    .attr("cy", 494.44 - (y - 1) * 55.56)
    .attr("r", 20)
    .attr("class", "point")
    .attr("class", "newCircle");

  let newCircles = document.querySelectorAll(".newCircle");
  for (let i = 0; i < newCircles.length; i++) {
    newCircles[i].addEventListener("click", lastClicked);
  }
});

function lastClicked() {
  const x = this.getAttribute("cx");
  const y = this.getAttribute("cy");
  this.classList.toggle("selected");

  let newText =
    "Last point clicked: (" +
    Math.round((x - 55.55) / 55.56) +
    ", " +
    Math.round(Math.abs(y - 550) / 55.56) +
    ")";

  document.getElementById("right_col_text").innerHTML = newText;
}

// for (let i = 0; i < round.length; i++) {
//   console.log("hi");
//   round[i].addEventListener("click", function () {
//     this.classList.toggle("selected");

// const x = xInput.value;
// const y = yInput.value;

// let newText =
//   "Last point clicked: (" +
//   Math.round((x - 10) / 50) +
//   ", " +
//   Math.round(Math.abs(y - 510) / 50) +
//   ")";

// document.getElementById("right_col_text").innerHTML = newText;
//   });
// }

var svg = d3.select(".svg2"),
  margin = 200,
  width = svg.attr("width") - margin,
  height = svg.attr("height") - margin;

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
  yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip-donut")
  .style("opacity", 0);

d3.csv("data/bar-data.csv").then(function (data) {
  xScale.domain(
    data.map(function (d) {
      return d.category;
    })
  );
  yScale.domain([
    0,
    d3.max(data, function (d) {
      return d.amount;
    }),
  ]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g").call(
    d3
      .axisLeft(yScale)
      .tickFormat(function (d) {
        return d;
      })
      .ticks(10)
  );

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "d3-tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", "15px")
    .style("background", "rgba(0,0,0,0.6)")
    .style("border-radius", "5px")
    .style("color", "#fff");

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("id", function (d) { return d.amount; })
    .attr("class", "bar")
    .attr("x", function (d) {
      return xScale(d.category);
    })
    .attr("y", function (d) {
      return yScale(d.amount);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return height - yScale(d.amount);
    })
    .on("mouseover", function (d, i) {
      d3.select(this).attr("class", "highlight");
      tooltip
        .html(`Amount: ${this.getAttribute("id")}`)
        .style("visibility", "visible");
    })
    .on("mousemove", function (d) {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).attr("class", "bar");
      tooltip.html(``).style("visibility", "hidden");
    });
});
