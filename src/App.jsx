import * as Tone from 'tone';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
  // const [start, setStart] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //useEffect > tone.start
  const synthSounds = {
    oscillator: {
      type: 'triangle2',
    },
    envelope: {
      attack: 0.001,
      decay: 1.5,
      sustain: 0.2,
      release: 0.8,
    },
  };
  const limiter = new Tone.Limiter(-2);
  const synth = new Tone.Synth(synthSounds).chain(limiter, Tone.Master);

  async function playNote(note) {
    const element = document.getElementById(note);
    const noteFreq = Tone.Frequency(note);
    element.style.opacity = '.2';
    synth.triggerAttackRelease(noteFreq, '2n');
    await setTimeout(() => {
      element.style.opacity = '1';
    }, 3000);
  }

  function playInterval(notes) {
    var synth = new Tone.Synth(synthSounds).toDestination();
    var interval = new Tone.Sequence(
      function (time, note) {
        synth.triggerAttackRelease(note, 1);
      },
      notes,
      '2n'
    );
    interval.loop = false;
    interval.start(0);
    Tone.Transport.start('1');
  }

  function startGame() {
    // for loop = playNote
    // counter ++ when userHistory === cpuHistory else game over
    playInterval(['C4', 'D4', 'E4']);
  }

  return (
    <div className={styles.App}>
      <div className={styles.main}>
        <div className={styles.container}>
          <button
            // className={isActive ? styles.activeKey : styles.c4Hex}
            onClick={() => {
              // setIsActive(true);
              playNote('C4');
            }}
          >
            fghfgh
          </button>
          <div onClick={() => playNote('c4')} id="c4"></div>
          <div onClick={() => playNote('e4')}></div>
          <div onClick={() => playNote('f4')}></div>
          <div onClick={() => playNote('g4')}></div>
          <div onClick={() => playNote('f4')}></div>
          <div onClick={() => playNote('c4')}></div>
          <div onClick={() => playNote('c4')}></div>
          <div onClick={() => playNote('c4')}></div>
          <div onClick={() => playNote('c4')}></div>
        </div>
        <button onClick={startGame}>start</button>
      </div>
    </div>
  );
}

export default App;
