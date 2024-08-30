//------------------------------------//
// Define parameters.
//------------------------------------//

// Define comprehension thresholds.
var max_errors = 0;

// Define images to preload.
preload_images = [
  "img/instructions/instructions1.png",
  "img/instructions/instructions2.png",
  "img/instructions/instructions3.png",
  "img/instructions/instructions4.png",
  "img/instructions/instructions5.png",
  "img/instructions/instructions6.png",
  "img/instructions/instructions7.png",
  "img/instructions/instructions8.png",
  "img/instructions/instructions9.png",
  "img/instructions/instructions10.png",
  "img/instructions/instructions11.png",
  "img/instructions/instructions12.png",
  "img/instructions/instructions13.png",
  "img/instructions/instructions14.png",
  "img/instructions/instructions15.png",
  "img/instructions/instructions16.png",
  "img/instructions/instructions17.png",
  "img/instructions/instructions18.png",
  "img/instructions/instructions19.png",
  "img/instructions/ready.png",
  "img/instructions/finish.png",
  "img/instructions/end.png",
  "img/instructions/pause.png",
  "img/instructions/explicit1.png",
  "img/instructions/explicit2.png",
  "img/machines/machine1.png",
  "img/machines/machine2.png",
  "img/machines/machine3.png",
  "img/machines/machine4.png",
  "img/machines/machine5.png",
  "img/machines/machine6.png",
  "img/shark.png",
  "img/turtle.png",
  "img/fish.png",
  "img/tiger.png",
  "img/replay.png",
];

preload_audio = [
  "audio/instructions1.wav",
  "audio/instructions2.wav",
  "audio/instructions3.wav",
  "audio/instructions4.wav",
  "audio/instructions5.wav",
  "audio/instructions6.wav",
  "audio/instructions7.wav",
  "audio/instructions8.wav",
  "audio/instructions9.wav",
  "audio/instructions10.wav",
  "audio/instructions11.wav",
  "audio/instructions12.wav",
  "audio/instructions13.wav",
  "audio/instructions14.wav",
  "audio/instructions15.wav",
  "audio/instructions16.wav",
  "audio/instructions17.wav",
  "audio/instructions18.wav",
  "audio/instructions19.wav",
  "audio/beep_loop.wav",
  "audio/turtle.wav",
  "audio/shark.wav",
];

//------------------------------------//
// Define block #1
//------------------------------------//

// Instructions block #1.
var instructions01a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions1.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions1.wav'],
  choices: ['Next'],
}

var instructions01b = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions2.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions2.wav'],
  choices: ['Next'],
}

var instructions01c = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions3.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions3.wav'],
  choices: ['Next'],
}

var instructions01d = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions4.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions4.wav'],
  choices: ['Next'],
}

var instructions01e = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions5.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions5.wav'],
  choices: ['Next'],
}


// Practice trials #1.
var practice01 = {
  type: 'fcp-practice',
  arcade_colors: ['#EDC948', '#46d3c8'],
  correct: 1,
  valid_responses_s2: [37],
  timeline: [
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [0, 10] },
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [10, 0] },
  ],
  data: { phase: 'practice' }
}

var instructions02a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions6.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions6.wav'],
  choices: ['Next'],
}

var instructions02b = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions7.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions7.wav'],
  choices: ['Next'],
}

var instructions02c = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions8.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions8.wav'],
  choices: ['Next'],
}

// Quiz #1.
var quiz01 = {
  type: 'fcp-comprehension',
  prompts: [
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;Winning or losing at a slot machine depends only on how lucky that machine is.",
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;Some slot machines may be luckier than others.",
  ],
  correct: ["true", "true"]
}

//------------------------------------//
// Define instructions block 2
//------------------------------------//

// Instructions block #2.
var instructions03a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions9.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions9.wav'],
  choices: ['Next'],
}

var instructions03b = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions10.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions10.wav'],
  choices: ['Next'],
}

// Practice trials #2.
var practice02 = {
  type: 'fcp-trial',
  arcade_colors: ['#EDC948', '#46d3c8'],
  arcade_outcomes: [10, 10],
  bonus_offer: 0,
  correct: 1,
  practice_key: 38,
  data: { phase: 'practice' }
}

// Instructions block #3.
var instructions04a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions11.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions11.wav'],
  choices: ['Next'],
}

// Practice trials #3.
var practice03 = {
  type: 'fcp-trial',
  arcade_colors: ['#EDC948', '#46d3c8'],
  arcade_outcomes: [10, 10],
  bonus_offer: 6,
  correct: 1,
  practice_key: 40,
  data: { phase: 'practice' }
}

var instructions05a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions12.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions12.wav'],
  choices: ['Next'],
}

var instructions05b = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions13.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions13.wav'],
  choices: ['Next'],
}


var instructions05c = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions14.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions14.wav'],
  choices: ['Next'],
}


// Instructions block #4.
var instructions06a = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions15.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions15.wav'],
  choices: ['Next'],
}

var instructions06b = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions16.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions16.wav'],
  choices: ['Next'],
}

var instructions06c = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions17.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions17.wav'],
  choices: ['Next'],
}

var instructions06d = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions18.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions18.wav'],
  choices: ['Next'],
}

var instructions06e = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/instructions19.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/instructions19.wav'],
  choices: ['Next'],
}


// Quiz #2.
var quiz02 = {
  type: 'fcp-comprehension',
  prompts: [
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;How lucky a slot machine is changes over time.",
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;How lucky a slot machine is changes if it is on the left or the right side of the screen.",
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;How lucky a slot machine is depends on whether you or the computer chooses it.",
    "<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;The tokens I earn will affect my bonus payment.",
  ],
  correct: ["false", "false", "false", "true"]
}

// Explicit instructions
var explicit_instructions1 = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/explicit1.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/explicit1.wav'],
  choices: ['Next'],
}

var explicit_instructions2 = {
  type: 'audio-instructions',
  prompt: [
    `<img src="img/instructions/explicit2.png" style="${style}"></img>`,
  ],
  stimulus: ['audio/explicit2.wav'],
  choices: ['Next'],
}


//------------------------------------//
// Define instructions blocks.
//------------------------------------//

var instructions_loop_01 = {
  timeline: [
    instructions01a,
    instructions01b,
    instructions01c,
    instructions01d,
    instructions01e,
    practice01,
    instructions02a,
    instructions02b,
    instructions02c,
    quiz01,
  ],
  loop_function: function (data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    if (num_errors > max_errors) {
      return true;
    } else {
      return false;
    }

  }

}

var instructions_loop_02 = {
  timeline: [
    instructions03a,
    instructions03b,
    practice02,
    instructions04a,
    practice03,
    instructions05a,
    instructions05b,
    instructions05c,
  ]
}

var instructions_loop_03 = {
  timeline: [
    instructions06a,
    instructions06b,
    instructions06c,
    instructions06d,
    instructions06e,
    quiz02,
  ],
  loop_function: function (data) {

    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    if (num_errors > max_errors) {
      return true;
    } else {
      return false;
    }

  }

}

var explicit_instructions = {
  timeline: [
    explicit_instructions1,
    explicit_instructions2,
  ]

}
