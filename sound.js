document.addEventListener('DOMContentLoaded', function() {
  const context = new AudioContext();

  function play(frequency) {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = 'sine';

    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.125);
    gainNode.gain.linearRampToValueAtTime(0.001, context.currentTime + 0.25);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.25);
  }

  let startTime = null;
  let index = 1;
  requestAnimationFrame(function playSounds(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    if ((timestamp - startTime) > 250) {
      play(noteForIndex(numberForIndex(index)));
      index += 1;
      startTime = timestamp;
    }

    requestAnimationFrame(playSounds);
  });

  function numberForIndex(index) {
    let usedNumbers = [0];
    let currentNumber = 0;
    let negNumber;

    for(let i = 1; i<=index; i++) {
      negNumber = currentNumber - i;
      if (negNumber > 0 && usedNumbers.indexOf(negNumber) === -1) {
        currentNumber -= i;
      } else {
        currentNumber += i;
      }
      usedNumbers.push(currentNumber);
    }

    return currentNumber;
  }

  function noteForIndex(index) {
    const notes = [
//      16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87,
//      32.7, 34.65, 36.71, 38.39, 41.20, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74,
//      65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.83, 110.0, 116.54, 123.47,
      130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65, 220.0, 233.08, 246.94,
      261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.0, 415.3, 440.0, 466.16, 493.88,
      523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77,
      1046.5, 1108.73, 1174.66, 1244.51, 1318.51, 1396.91, 1479.98, 1567.98, 1661.22, 1760.0, 1864.66, 1975.52,
      2093.0, 2217.46, 2349.32, 2489.02, 2637.02, 2793.83, 2959.96, 3135.96, 3322.44, 3520.0, 3729.31, 3951.07,
      4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.0, 7458.62, 7902.13
    ];

    let note = notes[index % notes.length];
    return note;
  }
});
