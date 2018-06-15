document.addEventListener('DOMContentLoaded', function() {
  let canvas = document.getElementById('recamans-canvas');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  let context = canvas.getContext('2d');

  let flashingSquares = [];
  for (var x = 0; x < 128; x++) {
    for (var y = 0; y < 128; y++) {
      flashingSquares.push([x, y]);
    }
  }

  function drawRecamansTo(sequenceLength, percent) {
    var start = {x: 10, y: canvas.height / 2};
    var upOrDown = 1;
    var usedNumbers = [0];
    var currentNumber = 0;
    var negNumber;
    var jump;
    var interval = 10;
    var through;
    var end;
    var heightChange;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let arcPercent;
    let direction;
    for(var i = 1; i<=sequenceLength; i++) {
      negNumber = currentNumber - i;
      if (negNumber > 0 && usedNumbers.indexOf(negNumber) === -1) {
        currentNumber -= i;
        jump = -1 * i * interval;
      } else {
        currentNumber += i;
        jump = i * interval;
      }
      if (upOrDown === -1 && jump < 0) {
        heightChange = jump;
      } else if (upOrDown === 1 && jump < 0) {
        heightChange = jump * -1;
      } else if (upOrDown === -1 && jump > 0) {
        heightChange = jump * -1;
      } else {
        heightChange = jump;
      }
      end = { x: start.x + jump, y: start.y };

      if (i === sequenceLength) {
        context.beginPath();
        var rectProgress = 2 * percent;
        if (rectProgress > 1) {
          rectProgress = 2 - rectProgress;
        }
        context.fillStyle = `rgba(33, 33, 33, ${rectProgress})`;
        let flashingSquare;
        for (var s = 0; s < flashingSquares.length / 10; s++) {
          flashingSquare = flashingSquares[currentNumber * currentNumber * s % flashingSquares.length];
          context.fillRect(flashingSquare[0] * canvas.width / 128, flashingSquare[1] * canvas.width / 128, canvas.width / 128, canvas.height / 128);
        }
        
        context.beginPath();
        context.textAlign = 'center';
        context.font = `${canvas.width / 10}px serif`;
        context.fillStyle = `rgba(255, 255, 255, ${rectProgress})`;
        context.textBaseline = 'middle';
        context.fillText(currentNumber, canvas.width / 2, canvas.height / 2, canvas.width - 40);
      }

      context.beginPath();

      arcPercent = 1;
      if (i === sequenceLength) {
        arcPercent = percent; 
      }

      if (upOrDown === 1 && jump > 0) {
        context.arc(end.x - ((end.x - start.x) / 2), end.y, Math.abs((end.x - start.x) / 2), Math.PI, Math.PI * (1 + arcPercent));
      } else if (upOrDown === 1 && jump < 0) {
        context.arc(end.x - ((end.x - start.x) / 2), end.y, Math.abs((end.x - start.x) / 2), Math.PI * (2 - arcPercent), 0);
      } else if (upOrDown === -1 && jump > 0) {
        context.arc(end.x - ((end.x - start.x) / 2), end.y, Math.abs((end.x - start.x) / 2), Math.PI, Math.PI * (1 - arcPercent), true);
      } else {
        context.arc(end.x - ((end.x - start.x) / 2), end.y, Math.abs((end.x - start.x) / 2), 0, Math.PI * arcPercent);
      }
      start = end;
      upOrDown = upOrDown * -1;
      usedNumbers.push(currentNumber);
      context.strokeStyle = `hsl(${i * 2 % 360}, 15%, 50%)`;
      context.lineWidth = interval / 2;
      context.stroke();
    }
  }

  let startTime = null;
  let sequenceNumber = 0;
  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    drawRecamansTo(sequenceNumber, (timestamp - startTime) / 250);

    if (timestamp - startTime >= 250) {
      startTime = timestamp;
      sequenceNumber += 1;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  function drawLines() {
    let canvas = document.getElementById('recamans-canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    let context = canvas.getContext('2d');
    let start = null;
    let yOffset = 10;

    context.lineWidth = 1;
    context.strokeStyle = '#000000'

    function animate(timestamp) {
      if (!start) {
        start = timestamp;
      }

      let time = timestamp - start;
      let nextX = Math.min(
        canvas.width * time / 300,
        canvas.width
      );

      context.clearRect(0, yOffset, canvas.width, 1);
      context.beginPath();
      context.moveTo(0, yOffset);
      context.lineTo(nextX, yOffset)
      context.stroke();
      
      if (nextX < canvas.width) {
        requestAnimationFrame(animate)
      } else if (yOffset < canvas.height) {
        start = timestamp;
        yOffset += 10;
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate);
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
