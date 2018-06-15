var path;
function onFrame(event) {
  var start = new Point(0, view.center.y);
  if (path) {
    path.remove();
  }
  
  path = new Path();
  path.add(start);

  percentComplete = event.time / 5;
  nextPoint = start + [100 * percentComplete, 0];
  nextThrough = start + [50 * percentComplete, 50 * percentComplete];
  path.arcTo(nextThrough, nextPoint);

  path.strokeColor = 'black';
}

function staticRecamans() {
  var start = new Point(10, view.center.y);
  var upOrDown = 1;
  var group = new Group();

  var usedNumbers = [0];
  var currentNumber = 0;
  var negNumber;
  var jump;
  var interval = 2;
  var through;
  var end;
  var heightChange;
  var color = new Color(0.7, 0.9, 0.4);

  for(var i = 1; i<=10000; i++) {
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
    through = start + [(jump / 2), (heightChange / 2)];
    end = start + [jump, 0];
    var path = new Path.Arc(start, through, end);
    group.addChild(path);
    start = end;
    upOrDown = upOrDown * -1;
    usedNumbers.push(currentNumber);
    color.hue = color.hue + 0.4;
    path.strokeColor = color;
  }
}
