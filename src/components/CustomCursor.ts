import gsap from "gsap";
import paper from "paper";
import Utils from "../utils";

// Small Cursor
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
  });
  const render = () => {
    gsap.set(innerCursor, { x: clientX, y: clientY });
    document.querySelector<HTMLDivElement>(".cursor--canvas")!.style.width =
      window.innerWidth.toString();
    document.querySelector<HTMLDivElement>(".cursor--canvas")!.style.height =
      window.innerHeight.toString();
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();

// Cursor Circle
let lastX = 0;
let lastY = 0;
let isStuck = false;
let group: paper.Group, stuckX: number, stuckY: number;
let currentTarget: HTMLElement;

const initCanvas = () => {
  const canvas = document.querySelector<HTMLCanvasElement>(".cursor--canvas")!;
  canvas.style.width = window.innerWidth.toString();
  canvas.style.height = window.innerHeight.toString();
  const shapeBounds = {
    width: 75,
    height: 75,
  };

  paper.setup(canvas);
  const strokeColor = "hsla(209, 0%, 100%, 0.6)";
  const strokeWidth = 2;
  const segments = 8;
  const radius = 15;
  //   const rotation = 45;

  const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
    // rotation
  );
  polygon.strokeColor = new paper.Color(strokeColor);
  polygon.strokeWidth = strokeWidth;
  polygon.smooth();
  group = new paper.Group([polygon]);
  group.applyMatrix = false;

  paper.view.onFrame = () => {
    // For button
    if (!isStuck) {
      lastX = Utils.lerp(lastX, clientX, 0.1);
      lastY = Utils.lerp(lastY, clientY, 0.1);
      group.position = new paper.Point(lastX, lastY);
    } else if (isStuck) {
      lastX = Utils.lerp(lastX, stuckX, 0.2);
      lastY = Utils.lerp(lastY, stuckY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    }

    if (
      isStuck &&
      polygon.bounds.width < shapeBounds.width &&
      currentTarget.classList.contains("nav__link")
    ) {
      polygon.scale(5);
      polygon.strokeWidth = strokeWidth * 2;
    } else if (
      isStuck &&
      polygon.bounds.width < shapeBounds.width &&
      currentTarget.classList.contains("nav__button")
    ) {
      polygon.scale(1.1);
    } else if (!isStuck && polygon.bounds.width > radius * 2) {
      polygon.scale(0.9);
      polygon.strokeWidth = strokeWidth;
    }

    // For nav list
    if (!isStuck) {
      lastX = Utils.lerp(lastX, clientX, 0.1);
      lastY = Utils.lerp(lastY, clientY, 0.1);
      group.position = new paper.Point(lastX, lastY);
    }
  };
};

initCanvas();
