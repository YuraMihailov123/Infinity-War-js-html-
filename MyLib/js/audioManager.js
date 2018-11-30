var audioManager = {
    audioBack :new Audio(),
    audioDeath :new Audio(),
    audioHit2 :new Audio(),
    audioHit1 :new Audio(),
    Back:function() {
        this.audioBack.volume =1;
        //this.audioBack.volume = 0.63;
        this.audioBack.src = '../MyLib/Audio/back.wav';
        this.audioBack.autoplay = true;
    },
    Death:function () {
        this.audioDeath.src = '../MyLib/Audio/death.wav';
        this.audioDeath.autoplay = true;
    },
    Hit1:function () {
        this.audioHit1.src = '../MyLib/Audio/hit1.wav';
        this.audioHit1.volume = 0.65;
        this.audioHit1.autoplay = true;
    },
    Hit2:function () {
        this.audioHit1.src = '../MyLib/Audio/hit1.wav';
        this.audioHit1.volume = 0.65;
        this.audioHit1.autoplay = true;
    }
};
