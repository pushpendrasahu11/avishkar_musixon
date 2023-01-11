import { allDetail} from "./mainData.js";

var currentImage = document.getElementById('current_image');
var currentTitle = document.getElementById('currentTitle');
var currentId = '';
var currentName='';
var currentArtists = document.getElementById('currentArtists');
var duration;
var currentTrack='';
var isPlaylistAdded =0;

let mainPlayIcon = document.getElementById('music_play_icon');

let current_time = document.getElementById('current_time');
let end_time = document.getElementById('end_time');

let playedLength = document.getElementById('played_length');
let  bar= document.getElementById('bar');


export async function playTrack(trackName,music){
    
    if(trackName==currentName) return;
    let trackDetail = await allDetail(trackName);
    currentImage.src=trackDetail.trackImage;
    currentTitle.innerHTML=trackDetail.trackTitle;
    currentArtists.innerHTML=trackDetail.trackArtists;
    currentId=trackDetail.trackId;
    currentName=trackDetail.trackDetail;
    duration=trackDetail.trackDuration;
    music.src=trackDetail.trackUrl;
    addTrackInQueue(currentTitle.innerHTML);


    music.play();
    currentTrack = music;
    
    
    mainPlayIcon.classList.remove('bi-play-fill');
    mainPlayIcon.classList.add('bi-pause-fill'); 

}


export async function updateTime(music){
music.addEventListener('timeupdate', async ()=>{

    let musicCurrentTime = music.currentTime;
    let musicEndTime = parseInt(duration - 1);

    console.log("duration in time update"+duration);
    let currentMinutes = Math.floor(musicCurrentTime/60 );
    let currentSeconds = Math.floor(musicCurrentTime%60 );

    let endMinutes = Math.floor(musicEndTime/60 );
    let endSeconds = Math.floor(musicEndTime%60 );

    if(currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    if(endSeconds < 10) endSeconds = `0${endSeconds}`;

    current_time.innerHTML = `${currentMinutes}:${currentSeconds}`
    if(musicEndTime){
        end_time.innerHTML = `${endMinutes}:${endSeconds}`;
    }
    // to dodge NaN

    let currentLength = parseInt((musicCurrentTime / musicEndTime)*100);
    

    if(musicEndTime){
        playedLength.value = currentLength;
    }
    bar.style.width= `${playedLength.value}%`
    
    if( parseInt(musicCurrentTime) == musicEndTime){
        console.log("song enddd")
        playNextSong(music);
    }
    
    // for auto play
});
}

playedLength.addEventListener("input", () => {
    let music = currentTrack;
    console.log("duration in input "+duration );
    console.log("playedLength.value in input "+playedLength.value );
    music.currentTime = parseInt(playedLength.value * duration / 100);
    console.log(music.currentTime);
})

var queueArray=[];

export async function addTrackInQueue(trackName){
    let isPresent = queueArray.find((ele) => {
        return ele == trackName;
    })
    console.log(isPresent);
    if(isPresent === undefined)
    {
    console.log(isPresent+" added in queue")
    console.log(queueArray);
    queueArray.push(trackName);
    let queue=document.getElementsByClassName('queue')[0];
    queue.innerHTML+=`<li >
        <div class="image_play">
        <img src=${currentImage.src} alt="">
        <img class="play_icon" id=${currentName} src="../images/play.svg" alt="">
    </div>
    <div>
        <h4>${currentTitle.innerHTML}</h4>
        <h5>${currentArtists.innerHTML}</h5>
    </div>
    <i class="bi bi-dash-circle"></i>
    </li>`

    // if(!isPlaylistAdded){
        
    //     hotHitsHindi.map((obj)=>{
    //         let trackArtists = '';
    //         obj.track.artists.map((obj)=>{
    //             trackArtists += obj.name + ', ';
    //         });
    //         queue.innerHTML+=`<li >
    //         <div class="image_play">
    //             <img src=${obj.track.album.images[0].url} alt="">
    //             <img class="play_icon" id=${obj.track.id} src="../images/play.svg" alt="">
    //         </div>
    //         <div>
    //             <h4>${obj.track.name}</h4>
    //             <h5>${trackArtists.slice(0,-2)}</h5>
    //         </div>
    //         <i class="bi bi-dash-circle"></i>
    //         </li>`
    //     })
    // }

    }
}

export async function playPreviousSong(music){
    let index = queueArray.indexOf(currentTitle.innerHTML);
    if(index==0) return ;
    
    // if(music.duration>200) {
    //     music.duration = 0;
    //     return ;
    // }
    console.log('playback');
    console.log(queueArray);
    console.log(queueArray[index]);
    console.log(queueArray[index-1]);
    playTrack(queueArray[index-1],music);

}

export async function playNextSong(music){
    let index = queueArray.indexOf(currentTitle.innerHTML);
    if(index==queueArray.length-1) return ;
    playTrack(queueArray[index+1],music);

}

