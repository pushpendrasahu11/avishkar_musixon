import songs from './songs.json' assert {type: 'json'};
import artists from './artist.json' assert {type: 'json'};
// imprting json files

// code for working of sliding buttons for each list
let my_list_length=document.getElementsByClassName('songs').length;
for (let i=0; i<my_list_length;i++){
    
    let go_left = document.getElementsByClassName('bi-chevron-left')[i];
    let go_right = document.getElementsByClassName('bi-chevron-right')[i];
    let my_list = document.getElementsByClassName('songs')[i];



    go_left.addEventListener('click', ()=>{
        my_list.scrollLeft -= 730;
    })

    go_right.addEventListener('click', ()=>{
        my_list.scrollLeft += 730;
    })
}

let data = [...songs];
// [...] to make clone


let tar1 = document.getElementById('list01').getElementsByClassName('songs')[0];

for(let i=0;i<data.length;i++){
    
    tar1.innerHTML+=`<li class="song" id="${songs[i].id}">
    <div class="image_play">
        <img src="${songs[i].song_image}" alt="">
        <img class="play_icon" id="${songs[i].id}" src="../images/play.svg" alt="">
    </div>
    <div>
        ${songs[i].song_name}
    </div>
</li>`
}

let tar = document.getElementById('list03').getElementsByClassName('songs')[0];

for(let i=0;i<data.length;i++){
    
    tar.innerHTML+=`<li id="song${data[i].id}">
    <div class="image_play">
        <img src="${data[i].song_image}" alt="">
        <img class="play_icon" id="${songs[i].id}" src="../images/play.svg" alt="">
    </div>
    <div>
        ${data[i].song_name}
    </div>
</li>`
}

let queuedata = songs;

let tar_queue=document.getElementsByClassName('queue')[0];

for(let i=0;i<queuedata.length;i++){
    
        tar_queue.innerHTML+=`<li class="song" id="song${queuedata[i].id}">
        <div class="image_play">
            <img src="${queuedata[i].song_image}" alt="">
            <img class="play_icon" id="${songs[i].id}" src="../images/play.svg" alt="">
        </div>
        <div>
            ${queuedata[i].song_name}
        </div>
        <i class="bi bi-plus-circle"></i>
    </li>`
}

let artistdata = artists;
let tar_artist=document.getElementsByClassName('artists')[0];

for(let i=0;i<artistdata.length;i++){
    
        tar_artist.innerHTML+=`<li id="artist${artistdata[i].id}">
        <div class="image_play">
            <img src="${artistdata[i].artist_image}" alt="">
            <img class="play_artist" id="${songs[i].id}" src="../images/play.svg" alt="">
        </div>
            ${artistdata[i].artist_name}
    </li>`
}

// playing song

const music = new Audio('../songs/song1.mp3');
let current_song_id=0;

let music_play_icon = document.getElementById('music_play_icon');

music_play_icon.addEventListener('click', ()=>{
    if(music.paused || music.currentTime<=0){
        music.play();
        music_play_icon.classList.remove('bi-play-fill');
        music_play_icon.classList.add('bi-pause-fill');
    }else{
        music.pause();
        music_play_icon.classList.add('bi-play-fill');
        music_play_icon.classList.remove('bi-pause-fill');    
    }
})

let song_array= Array.from(document.getElementsByClassName('play_icon'));
let current_image= document.getElementById('current_image');
let current_song= document.getElementById('current_song');
// console.log(song_array[4]);

playSong(song_array);

function playSong(array) {
    array.forEach((item) => {
        item.addEventListener('click', (ele) => {
            let song_id = ele.target.id;
            current_song_id = song_id;
            console.log(song_id);
            music.src=`../songs/song${song_id}.mp3`;
            current_image.src= `../images/song${song_id}.jpg`;
            let songname = songs.find((e) => {
                return e.id==song_id;
            })
    
            current_song.innerHTML=songname.song_name; 

            music.play();
            music_play_icon.classList.remove('bi-play-fill');
            music_play_icon.classList.add('bi-pause-fill');
            // console.log(music.src);

            // played_length.value=0;

            allBackground();
            let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
            queue_position.style.background = "rgba(230, 230, 230, 0.9)";
            allPlayButton();
            item.src=`../images/pause.svg`
        })
    })
    
}

function allPlayButton(){
    let myArray = Array.from(document.getElementsByClassName('play_icon'));
    myArray.forEach((ele) =>{
        ele.src=`../images/play.svg`
    })
}
function allBackground(){
    let myArray = Array.from(document.getElementsByClassName('queue')[0].getElementsByClassName('song'));
    myArray.forEach((ele) =>{
        ele.style.background = "rgba(230, 230, 230, 0.0)";
    })
}

let current_time = document.getElementById('current_time');
let end_time = document.getElementById('end_time');

let played_length = document.getElementById('played_length');
let  bar= document.getElementById('bar');
// let  point= document.getElementById('point');

music.addEventListener('timeupdate', ()=>{

    // setTimeout( function (){
    let music_current_time = music.currentTime;
    let music_end_time = music.duration;

    let current_minutes = Math.floor(music_current_time/60 );
    let current_seconds = Math.floor(music_current_time%60 );

    let end_minutes = Math.floor(music_end_time/60 );
    let end_seconds = Math.floor(music_end_time%60 );

    if(current_seconds < 10) current_seconds = `0${current_seconds}`;
    if(end_seconds < 10) end_seconds = `0${end_seconds}`;

    current_time.innerHTML = `${current_minutes}:${current_seconds}`
    if(music_end_time){
        end_time.innerHTML = `${end_minutes}:${end_seconds}`;
    }
    

    let current_length = parseInt((music_current_time / music_end_time)*100);
    

    if(music_end_time){
        played_length.value = current_length;
    }

    // console.log(played_length.value);
    bar.style.width= `${played_length.value}%`

});

played_length.addEventListener("input", ()=>{
    music.currentTime =  played_length.value * music.duration / 100;
    // console.log(music.currentTime);
})


 let play_next = document.getElementById('play_next');
 let play_back = document.getElementById('play_back');


 
play_back.addEventListener('click', () => {
        current_song_id--;
        if(current_song_id<1){
            current_song_id = songs.length;
        }
        let song_id = current_song_id;
        console.log("next"+song_id);
            music.src=`../songs/song${song_id}.mp3`;
            current_image.src= `../images/song${song_id}.jpg`;
            let songname = songs.find((e) => {
                return e.id==song_id;
            })
    
            current_song.innerHTML=songname.song_name; 

            music.play();
            music_play_icon.classList.remove('bi-play-fill');
            music_play_icon.classList.add('bi-pause-fill');
            // console.log(music.src);

            // played_length.value=0;

            allBackground();
            let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
            queue_position.style.background = "rgba(230, 230, 230, 0.9)";
            allPlayButton();
            // item.src=`../images/pause.svg`
})

play_next.addEventListener('click', () => {
    current_song_id++;
    if(current_song_id>songs.length){
        current_song_id = 1;
    }
    let song_id = current_song_id;
    console.log("next"+song_id);
        music.src=`../songs/song${song_id}.mp3`;
        current_image.src= `../images/song${song_id}.jpg`;
        let songname = songs.find((e) => {
            return e.id==song_id;
        })

        current_song.innerHTML=songname.song_name; 

        music.play();
        music_play_icon.classList.remove('bi-play-fill');
        music_play_icon.classList.add('bi-pause-fill');
        // console.log(music.src);

        // played_length.value=0;

        allBackground();
        let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
        queue_position.style.background = "rgba(230, 230, 230, 0.9)";
        allPlayButton();
        // item.src=`../images/pause.svg`
})

console.log('ok');
