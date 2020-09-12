import { CountUp } from './countUp.min.js';

var options = {
    useEasing : true,
    useGrouping : true,
    separator : '',
    decimal : '.',
    prefix : '',
    suffix : ''
};

window.onload = function() {
    var countUp = new CountUp('myTargetElement', 2000, options);
    countUp.start();
}

