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
    .attr("class", "point");

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
    .attr("class", "point");
});

const circle = document.querySelectorAll(".point");

console.log(circle);
for (var i = 0; i < circle.length; i++) {
  circle[i].addEventListener("click", function () {
    this.classList.toggle("selected");

    //   let cx = this.getAttributeNS(null, "cx");

    //   let cy = this.getAttributeNS(null, "cy");
    const x = xInput.value;
    const y = yInput.value;

    let newText =
      "Last point clicked: (" +
      Math.round((x - 10) / 50) +
      ", " +
      Math.round(Math.abs(y - 510) / 50) +
      ")";

    document.getElementById("right_col_text").innerHTML = newText;
  });
}
