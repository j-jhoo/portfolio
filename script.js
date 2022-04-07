//javscript

// navbar slide up down
var prevScrollpos = window.pageYOffset; 
window.onscroll = function() { 
var currentScrollpos = window.pageYOffset; 
if (prevScrollpos > currentScrollpos) { 
document.getElementById("nav").style.top = "0"; 
} else { 
document.getElementById("nav").style.top = "-100px"; 
}
prevScrollpos = currentScrollpos; 
}

// 원형 텍스트
const degreeToRadian = angle => {
  return angle * (Math.PI / 180);
}

const pointOnCircle = (radius, angle = 0) => {
  const xPos = radius * Math.cos(degreeToRadian(angle));
  const yPos = radius * Math.sin(degreeToRadian(angle));
  return {
      x: xPos,
      y: yPos
  }
}

const radius = 50; //반지름
const diameter = radius * 2;    //지름


const circle = document.querySelector('#circular-text');
circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.innerText;

//한 글자씩 분리
const characters = text.split('');
circle.innerText = null;    //나중에 character로 대체

const startAngle = -100;
const endAngle = 235;
const angleRange = endAngle - startAngle;

//각 글자마다 회전 각도의 차이
const deltaAngle = angleRange / (characters.length-1);
let currentAngle = startAngle;

characters.forEach((char, index) => {
  const charElement = document.createElement('span');
  charElement.innerText = char;
  circle.appendChild(charElement);

  let { x: xPos, y: yPos } = pointOnCircle(radius, currentAngle);
  
  /**
   * Move center of drawn circle to 
   * match parents center.
   */
  xPos += radius;
  yPos += radius;

  const translate = `translate(${xPos}px, ${yPos}px)`;
  const rotate = `rotate(${index * deltaAngle}deg)`;  //index 증가할 수록 많이 회전
  // const rotate = 'rotate(0deg)'

  charElement.style.transform = `${translate} ${rotate}`;

  currentAngle += deltaAngle;
});