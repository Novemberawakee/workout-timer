let rounds = 0;
let workTime = 0;
let restTime = 0;
let timerIdWork;
let timerIdRest;

const countdown = document.querySelector('#countdown');
const button = document.querySelector('#btn');

button.addEventListener('click', startWorkTimer);

    function startWorkTimer() {
        roundsInput = Number(document.querySelector('#rounds').value);
        workMin = Number(document.querySelector('#inputWorkMin').value);
        workSec = Number(document.querySelector('#inputWorkSec').value);

        if (roundsInput === 0 || workSec < 0) {
            Swal.fire({
                icon: 'error',
                title: 'error!',
                text: 'please enter rounds and work seconds',
            })
            return false;
        }

        workTime = workMin * 60 + workSec;
        restTime = 0;

        button.removeEventListener('click', startWorkTimer)

        function calculateWorkTime() {
            

            minutesWork = Math.floor(workTime/60);
            secondsWork = workTime%60;

            workTime--;
    
            if(secondsWork < 10) {
            secondsWork = "0" + secondsWork;
            }
            countdown.textContent = `${minutesWork} : ${secondsWork}`;

        if(workTime < 0) {
            stopWorkTimer();
            workTime = 0;
            document.querySelector("#player").play();

            startRestTimer();
            }

        }

        timerIdWork = setInterval(calculateWorkTime, 1000);


        function stopWorkTimer() {
            clearInterval(timerIdWork);
        }



        function startRestTimer() {
            rounds++;
            workTime = 0;
            restMin = Number(document.querySelector('#inputRestMin').value);
            restSec = Number(document.querySelector('#inputRestSec').value);

            if (restSec < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'error!',
                    text: 'please enter rest seconds',
                })
                return false;
            }

            if(rounds === roundsInput) {
                countdown.textContent = "00:00";
                document.querySelector("#done").play();
                document.querySelector("#player").pause();
                return false;
            }

            timerIdRest = setInterval(calculateRestTime, 1000);

            restTime = restMin * 60 + restSec;

            function calculateRestTime() {
                let minutesRest = Math.floor(restTime/60);
                let secondsRest = restTime%60;

                restTime--;

                if(secondsRest < 10) {
                    secondsRest = "0" + secondsRest;
                }
                countdown.textContent = `${minutesRest} : ${secondsRest}`;

                if(restTime < 0) {
                    stopRestTimer();
                    restTime = 0;
                    document.querySelector("#player").play();
                }
            }
        }

        function stopRestTimer() {
            clearInterval(timerIdRest);
            startWorkTimer();
        }
    }
