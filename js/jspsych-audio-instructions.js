/**
 * jspsych-audio-instructions
 * Kristin Diep
 *
 * plugin for playing an audio file and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["audio-instructions"] = (function () {
    var plugin = {};

    jsPsych.pluginAPI.registerPreload('audio-instructions', 'stimulus', 'audio');

    plugin.info = {
        name: 'audio-instructions',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.AUDIO,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The audio to be played.'
            },
            choices: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Choices',
                default: undefined,
                array: true,
                description: 'The button labels.'
            },
            button_html: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Button HTML',
                default: '<button class="jspsych-btn">%choice%</button>',
                array: true,
                description: 'Custom button. Can make your own style.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed below the stimulus.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'The maximum duration to wait for a response.'
            },
            margin_vertical: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Margin vertical',
                default: '0px',
                description: 'Vertical margin of button.'
            },
            margin_horizontal: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Margin horizontal',
                default: '8px',
                description: 'Horizontal margin of button.'
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, the trial will end when user makes a response.'
            },
            trial_ends_after_audio: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Trial ends after audio',
                default: false,
                description: 'If true, then the trial will end as soon as the audio file finishes playing.'
            },
        }
    }

    plugin.trial = function (display_element, trial) {

        // setup audio stimulus
        var context = jsPsych.pluginAPI.audioContext();
        if(context !== null){
          var source = context.createBufferSource();
          source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.stimulus);
          source.connect(context.destination);
        } else {
          var audio = jsPsych.pluginAPI.getAudioBuffer(trial.stimulus);
          audio.currentTime = 0;
        }
        // set up visual stimulus
        var html = trial.prompt;

        // store response
        var response = {
            rt: null,
            button: null
        };

    setupTrial();

 

    function setupTrial(){
        // show visual stimulus
        display_element.innerHTML = html;

        // start audio
    if(context !== null){
        startTime = context.currentTime;
        source.start(startTime);
        source.onended = function(){
            show_button();
        }
      } else {
        audio.play();
        audio.addEventListener('ended', show_button);
      }

        }

        function show_button() {
            var buttons = [];
            if (Array.isArray(trial.button_html)) {
                if (trial.button_html.length == trial.choices.length) {
                    buttons = trial.button_html;
                } else {
                    console.error('Error in image-button-response plugin. The length of the button_html array does not equal the length of the choices array');
                }
            } else {
                for (var i = 0; i < trial.choices.length; i++) {
                    buttons.push(trial.button_html);
                }
            }

            html += '<div id="jspsych-audio-instructions-btngroup">';
            for (var i = 0; i < trial.choices.length; i++) {
                var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                html += '<div class="jspsych-audio-instructions-button" style="cursor: pointer; position:absolute; bottom: 50px; left: 47%; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="jspsych-audio-instructions-button-' + i + '" data-choice="' + i + '">' + str + '</div>';
            }

            html += '</div>';
            display_element.innerHTML = html;
            var start_time = performance.now();
      
            // add event listeners to buttons
            for (var i = 0; i < trial.choices.length; i++) {
              display_element.querySelector('#jspsych-audio-instructions-button-' + i).addEventListener('click', function (e) {
                var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
                after_response(choice, start_time);
              });
            }
        }

        
        // function to handle responses by the subject
        function after_response(choice, start_time) {

            // measure rt
            var end_time = performance.now();
            var rt = end_time - start_time;
            response.button = choice;
            response.rt = rt;

            // disable all the buttons after a response
            var btns = document.querySelectorAll('.jspsych-audio-instructions-button button');
            for (var i = 0; i < btns.length; i++) {
                //btns[i].removeEventListener('click');
                btns[i].setAttribute('disabled', 'disabled');
            }

            if (trial.response_ends_trial) {
                end_trial();
            }
        };

        // function to end trial when it is time
        function end_trial() {

            // stop the audio file if it is playing
            // remove end event listeners if they exist
            if (context !== null) {
                source.stop();
                source.onended = function () { }
            } else {
                audio.pause();
                audio.removeEventListener('ended', end_trial);
            }

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // gather the data to store for the trial
            var trial_data = {
                "rt": response.rt,
                "stimulus": trial.stimulus,
                "button_pressed": response.button
            };

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };



        // end trial if time limit is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }

    };

    return plugin;
})();
