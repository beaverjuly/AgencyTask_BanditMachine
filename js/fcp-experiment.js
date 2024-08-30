//------------------------------------//
// Define parameters.
//------------------------------------//

// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:80vh;";

// Define reward probabilities (per context)
const probs = [
  [0.90, 0.10],
  [0.70, 0.30],
]

// Generate the change points for easy and hard trials
function generateChangePoints() {
  let changePoints = [];
  let totalTrials = 0;
  while (totalTrials < 180) {
    let changePoint = Math.floor(Math.random() * 8) + 28; // Random number between 28 and 35
    if (totalTrials + changePoint > 180) break;
    changePoints.push(totalTrials + changePoint);
    totalTrials += changePoint;
  }
  return changePoints;
}


// Define reward values.
const rewards = [10, 0];

// Define offers range.
const bonus_offers = [0, 1, 2, 3, 4, 5, 6];

// Define arcade colors.
const arcade_colors = jsPsych.randomization.shuffle([
  jsPsych.randomization.shuffle(["#D8271C", "#741CD8"]),    // red, purple
  jsPsych.randomization.shuffle(["#1CD855", "#FA92F8"]),    // green, pink
]);

//------------------------------------//
// Define audio test.
//------------------------------------//

// Define beep test trial.
var beep_test = {
  type: 'audio-keyboard-response',
  stimulus: 'audio/beep_loop.wav',
  choices: jsPsych.ALL_KEYS,
  prompt: 'Make sure your sound is turned on. </p> Then, press the space bar to proceed to the audio test.',
};

// Define audio test trial 1.
var audio_test_1 = {
  type: 'audio-test',
  stimulus: 'audio/turtle.wav',
  choices: ['repeat', 'fish', 'tiger', 'turtle', 'shark'],
  correct_answer: 3,
  prompt: 'Click on the word that you just heard.',
  incorrect_prompt: 'Incorrect, please adjust your volume and try again.',
  margin_vertical: '40px',
  margin_horizontal: '10px',
  button_html: [
    '<img src="img/replay.png" height="200px" width="200px"/>',
    '<img src="img/fish.png" height="200px" width="200px"/>',
    '<img src="img/tiger.png" height="200px" width="200px"/>',
    '<img src="img/turtle.png" height="200px" width="200px"/>',
    '<img src="img/shark.png" height="200px" width="200px"/>'
  ],
  post_trial_gap: 1000
};

var audio_test_2 = {
  type: 'audio-test',
  stimulus: 'audio/shark.wav',
  choices: ['repeat', 'turtle', 'shark', 'fish', 'tiger'],
  correct_answer: 2,
  prompt: 'Again, click on the word that you just heard.',
  incorrect_prompt: 'Incorrect, please adjust your volume and try again.',
  margin_vertical: '40px',
  margin_horizontal: '10px',
  button_html: [
    '<img src="img/replay.png" height="200px" width="200px"/>',
    '<img src="img/turtle.png" height="200px" width="200px"/>',
    '<img src="img/shark.png" height="200px" width="200px"/>',
    '<img src="img/fish.png" height="200px" width="200px"/>',
    '<img src="img/tiger.png" height="200px" width="200px"/>'
  ],
  post_trial_gap: 1000
};


//------------------------------------//
// Define free choice task.
//------------------------------------//

// Define reward generator.
function returnReward(p) {
  return Math.random() < p ? rewards[0] : rewards[1];
}

// Generate change points
const easyChangePoints = generateChangePoints();
const hardChangePoints = generateChangePoints();

// Define trial types
const trialTypes = [];
let easyCount = 0;
let hardCount = 0;

try {
  for (let i = 0; i < 180; i++) {
    if (i % 2 === 0 && easyCount < easyChangePoints.length) {
      trialTypes.push('easy');
      easyCount++;
    } else if (hardCount < hardChangePoints.length) {
      trialTypes.push('hard');
      hardCount++;
    } else {
      console.warn('未能分配更多的easy或hard试验类型');
      break; å
    }
  }
} catch (error) {
  console.error(error);
}

// Define block structure.
const factors = {
  context: [0, 1, 2],
  bonus_offer: bonus_offers
}

// Iteratively construct task.
var fcp_trials = [];
var trial_no = 0;

// Iterate over trial types and construct trials
trialTypes.forEach(trialType => {
  let context = (trialType === 'easy') ? 0 : 1;

  // Shuffle trial order
  var block = jsPsych.randomization.factorial(factors, 1);

  // Check maximum sequence length
  const seqmax = longestSequence(block.map(a => a.context));

  // Ensure longest sequence is length = 4
  while (seqmax >= 5) {
    block = jsPsych.randomization.factorial(factors, 1);
    const seqmax = longestSequence(block.map(a => a.context));
  }

  // Iterate over block trials
  block.forEach((info) => {
    info.context = context;

    // Define trial information
    if (Math.random() < 0.5) {
      info.correct = 1;
      info.arcade_ids = [2 * info.context, 2 * info.context + 1];
      info.arcade_outcomes = probs[info.context].map(returnReward);
      info.arcade_colors = arcade_colors[info.context];
      info.arcade_probs = probs[info.context];
    } else {
      info.correct = 0;
      info.arcade_ids = [2 * info.context + 1, 2 * info.context];
      info.arcade_outcomes = probs[info.context].slice().reverse().map(returnReward);
      info.arcade_colors = arcade_colors[info.context].slice().reverse();
      info.arcade_probs = probs[info.context].slice().reverse();
    }

    // Construct trial
    const trial = {
      type: 'fcp-trial',
      bonus_offer: info.bonus_offer,
      correct: info.correct,
      arcade_outcomes: info.arcade_outcomes,
      arcade_colors: info.arcade_colors,
      data: {
        context: info.context,
        reward_prob_L: info.arcade_probs[0],
        reward_prob_R: info.arcade_probs[1],
        arcade_id_L: info.arcade_ids[0],
        arcade_id_R: info.arcade_ids[1],
        phase: 'experiment',
        trial: trial_no + 1,
        block: Math.floor(trial_no / 45) + 1,
        trial_type: trialType
      },
    }

    // Define looping node
    const trial_node = {
      timeline: [trial],
      loop_function: function(data) {
        // Custom loop logic if needed
      }
    }

    // Append trial
    fcp_trials.push(trial_node);

    // Increment trial counter
    trial_no++;

  });
});


//------------------------------------//
// Define explicit knowledge task.
//------------------------------------//

// Iteratively construct task.
var explicit_knowledge = [];
var machines = 
jsPsych.randomization.shuffle(["img/machines/machine1.png",
"img/machines/machine2.png",
"img/machines/machine5.png",
"img/machines/machine6.png"]);

for (let i = 0; i < 6; i++) {

    // Construct trial.
    const explicit_trial = {
      type: 'image-slider-response',
      stimulus: machines[i],
      stimulus_height: 300,
      min: 1, 
      max: 9,
      start: 5,
      step: 1,
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      prompt: "If you played this machine 10 times, how many times would you win? <br> <br>",
      button_label: "Submit response",
      data: {
        phase: 'explicit',
        stimulus: machines[i]
      },
    }

    // Append trial.
    explicit_knowledge.push(explicit_trial);

  };


//---------------------------------------//
// Define functions.
//---------------------------------------//

function longestSequence( arr ) {

  // Initialize variables.
  var counts = [0,0];
  var seqmax = 0;

  arr.forEach((i) => {

    // Increment counts.
    counts = counts.map(function(v){return ++v;});

    // Reset counter of context.
    counts[i] = 0;

    // Update sequence length max.
    if ( Math.max(...counts) > seqmax ) { seqmax = Math.max(...counts) };

  });

  return seqmax

}


