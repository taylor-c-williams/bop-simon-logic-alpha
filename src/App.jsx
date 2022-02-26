import * as Tone from 'tone';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
  const [start, setStart] = useState(false);

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
  function playNote(id) {
    const noteFreq = Tone.Frequency(id);
    synth.triggerAttackRelease(noteFreq, '2n');
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
    setStart(true);
    playInterval(['C4', 'D4', 'E4']);
  }

  return (
    <div className={styles.App}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div onClick={() => playNote('c4')}></div>
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
