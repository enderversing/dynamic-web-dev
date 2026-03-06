window.onload = () => {
  console.log("script is connected.");
  // first param is canvas function
  let myp5 = new p5(myCanvas, "canvas");
  let myp52 = new p5(myCanvas2, "canvas2");
};

const myCanvas = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };
  sketch.draw = () => {
    sketch.background("LavenderBlush");
  };
};

const myCanvas2 = (sketch) => {
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };
  sketch.draw = () => {
    sketch.background("Lavender");
  };
};
