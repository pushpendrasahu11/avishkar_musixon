import { allDetail} from "./mainData.js";

var currentImage = document.getElementById('current_image');
var currentTitle = document.getElementById('currentTitle');
var currentId ='https://www.jiosaavn.com/song/deva-deva-from-brahmastra/MVkgViZYe1E';
var currentName='';
var currentArtists = document.getElementById('currentArtists');
var duration;
var music = new Audio();
var isPlaylistAdded =0;
var repeat=0;
var isShuffle = false;
var queueSongArray = Array.from(document.getElementsByClassName('queue_play_icon'));;
var playSongArray = Array.from(document.getElementsByClassName('play_icon'));
var searchSongArray = Array.from(document.getElementsByClassName('search_play_icon'));

let mainPlayIcon = document.getElementById('music_play_icon');
let volumeIcon = document.getElementById('volume_icon');

let current_time = document.getElementById('current_time');
let end_time = document.getElementById('end_time');

let playedLength = document.getElementById('played_length');
let  bar= document.getElementById('bar');

let currentVolume = document.getElementById('current_volume');
let volumeBar = document.getElementById('vol_bar');


let playNext = document.getElementById('play_next');
let playBack = document.getElementById('play_back');

let queueMode = document.getElementById('queue_mode');
let shuffleIcon = document.getElementById('shuffle_icon');

let queueIcon = document.getElementById('queue_icon');
let tarQueue = document.getElementById('queueid');

updateTime(music);

export async function playTrack(trackId){

    if(trackId==currentId && repeat!=1) return;
    if(playSongArray.length == 0){
        playSongArray = Array.from(document.getElementsByClassName('play_icon'));
    }
    searchSongArray = Array.from(document.getElementsByClassName('search_play_icon'));

    console.log(searchSongArray)
    allPlayButton(playSongArray,trackId); 
    allPlayButton(searchSongArray,trackId);    

    let trackDetail = await allDetail(trackId);
    currentImage.src=trackDetail.trackImage;
    currentTitle.innerHTML=trackDetail.trackTitle;
    currentArtists.innerHTML=trackDetail.trackArtists;
    currentId=trackDetail.trackLink;
    currentName=trackDetail.trackDetail;
    duration=trackDetail.trackDuration;
    music.src=trackDetail.trackUrl;
    addTrackInQueue(currentId);
    allPlayButton(queueSongArray,trackId);


    music.play();
    
    
    music.volume=0.6;
    mainPlayIcon.classList.remove('bi-play-fill');
    mainPlayIcon.classList.add('bi-pause-fill'); 

}

playBack.onclick = function () { playPreviousSong(music) }
playNext.onclick = function () { playNextSong(music) }


export async function updateTime(music){
music.addEventListener('timeupdate', async ()=>{

    let musicCurrentTime = music.currentTime;
    let musicEndTime = music.duration;

    // console.log("duration in time update"+duration);
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
    
    if( (musicCurrentTime) === (musicEndTime)){
        console.log("song enddd")
         playNextSong(music);
    }
    // for auto play
});
}

playedLength.addEventListener("input", () => {
    
    console.log("duration in input "+duration );
    console.log("playedLength.value in input "+playedLength.value );
    music.currentTime = parseInt(playedLength.value * duration / 100);
    console.log(music.currentTime);
})


export function allPlayButton(array,songid) {  
    array.forEach((ele) => {
        ele.src = `../images/play.svg`
        if(ele.id == songid) ele.src = `../images/pause.svg`
        console.log('icon change done allpaly');
    })
}

function allPauseButton(array,songid) {  
    let songis = array.filter((ele) => {
        return ele.id == songid;
    })
    songis.forEach((ele)=>{
        ele.src = `../images/play.svg`;
    })

    console.log('pause done ')
}


var queueArray=[];

queueIcon.addEventListener('click', () => {
        tarQueue.classList.add("big");
})

document.addEventListener('click',(e)=>{
    if(e.target.id !== 'queueid' && e.target.id !=='queue_icon'){
        tarQueue.classList.remove("big");
    }
})

export async function addTrackInQueue(trackId){
    let isPresent = queueArray.find((ele) => {
        return ele == trackId;
    })
    // console.log(isPresent);
    if(isPresent === undefined)
    {
    // console.log(isPresent+" added in queue")
    // console.log(queueArray);
    queueArray.push(trackId);



    let queue=document.getElementsByClassName('queue')[0];
    queue.innerHTML+=`<li >
        <div class="image_play">
        <img src=${currentImage.src} alt="">
        <img class="queue_play_icon" id="${currentId}" src="../images/play.svg" alt="">
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
    queueSongArray = Array.from(document.getElementsByClassName('queue_play_icon'));
    // playplaylist(queueSongArray);
    // console.log(queueSongArray);


    
    queueSongArray.forEach((item) => {
            item.addEventListener('click', (ele) => {
                playTrack(ele.target.id);
            })
        })

    

    
}

queueMode.addEventListener('click',()=>{
    
    if(queueMode.classList == 'bi bi-repeat inactive'){
        queueMode.classList.remove('inactive');  
        repeat=2;
    }else if(queueMode.classList == 'bi bi-repeat'){
        queueMode.classList.remove('bi-repeat');
        queueMode.classList.add('bi-repeat-1');
        repeat=1;
    }else if(queueMode.classList == 'bi bi-repeat-1'){
        queueMode.classList.remove('bi-repeat-1');
        queueMode.classList.add('bi-repeat');
        queueMode.classList.add('inactive');
        //  queueMode.style.color='#707070';
        repeat=0;
    }

})

shuffleIcon.addEventListener('click',()=>{
    if(shuffleIcon.classList == 'bi bi-shuffle inactive'){
        shuffleIcon.classList.remove('inactive');
        isShuffle = true;
    }else{
        shuffleIcon.classList.add('inactive');
        isShuffle = false;
    }
})

mainPlayIcon.addEventListener('click', () => {
    
    if (music.paused || music.currentTime <= 0) {
        music.play();
        mainPlayIcon.classList.remove('bi-play-fill');
        mainPlayIcon.classList.add('bi-pause-fill');
        console.log(currentId+ " in main play" )
        allPlayButton(queueSongArray,currentId);
        allPlayButton(playSongArray,currentId);

    } else {
        music.pause();
        mainPlayIcon.classList.add('bi-play-fill');
        mainPlayIcon.classList.remove('bi-pause-fill');
        console.log(currentId+ "in main pause" )
        allPauseButton(queueSongArray,currentId);
        allPauseButton(playSongArray,currentId);
    }
})

export async function playPreviousSong(music){

    if(music.currentTime>5) {
        music.currentTime = 0;
        return ;
    }

    if(repeat==1){
        playTrack(currentId);
        return ;
    }
    let index = queueArray.indexOf(currentId);

    if(index==0) {
        if(repeat == 0) return;
        playTrack(queueArray[queueArray.length-1]);
    }
    
    // if(music.duration>200) {
    //     music.duration = 0;
    //     return ;
    // }

    // console.log('playback');
    // console.log(queueArray);
    // console.log(queueArray[index]);
    // console.log(queueArray[index-1]);
    else playTrack(queueArray[index-1]);

}

var randomarr=new Set();

export async function playNextSong(music){
    console.log('here repeat is '+repeat)

    if(repeat==1){
        console.log('now repeating');
        playTrack(currentId);
        return ;
    }

    let index = queueArray.indexOf(currentId);

    if(isShuffle){
        console.log(randomarr);
        randomarr.add(index);
        console.log(randomarr);
        if(randomarr.size == queueArray.length) {
            console.log('setfull')
            randomarr.clear();
        }else{
        while((randomarr.has(index)) ){
            console.log("math")
            index = Math.floor(Math.random() * (queueArray.length));
        }
        console.log(index);
        index--;
        
        }  
    }

    index++;

    if(index==queueArray.length) {
        if(repeat==2 || (isShuffle && randomarr.size) ) playTrack(queueArray[0]);
        return ;
    }
    
    playTrack(queueArray[index]);

}

currentVolume.addEventListener("input", () => {
    if(currentVolume.value==0){
        volumeIcon.classList.remove('bi-volume-up-fill');
        volumeIcon.classList.remove('bi-volume-down-fill');
        volumeIcon.classList.add('bi-volume-off-fill');
    }
    else if(currentVolume.value>0 && currentVolume.value<50){
        volumeIcon.classList.remove('bi-volume-up-fill');
        volumeIcon.classList.remove('bi-volume-off-fill');
        volumeIcon.classList.add('bi-volume-down-fill');
    }else {
        volumeIcon.classList.remove('bi-volume-off-fill');
        volumeIcon.classList.remove('bi-volume-down-fill');
        volumeIcon.classList.add('bi-volume-up-fill');
    }
    let barWidth = currentVolume.value *(70/100);
    volumeBar.style.width = `${barWidth}%`;

    music.volume = currentVolume.value/100;
    
})

