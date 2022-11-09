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

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }

// shuffleArray(data);

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

const music = new Audio('../songs/song1.mp3')

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
//let queue_array= Array.from(document.getElementsByClassName(''));
let current_image= document.getElementById('current_image');
let current_song= document.getElementById('current_song');
console.log(song_array[4]);

playSong(song_array);

function playSong(array) {
    array.forEach((item) => {
        item.addEventListener('click', (ele) => {
            let song_id = ele.target.id;
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

            allBackground();
            let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
            queue_position.style.background = "rgba(230, 230, 230, 0.9)";
            console.log(ele.src);
            allPlayButton();
            console.log(ele);
            console.log(ele.src);
            ele.src=`../images/play.svg`
            console.log(item);
            console.log(ele.src);
        })
    })
    
}

function allPlayButton(){
    let myArray = Array.from(document.getElementsByClassName('play_icon'));
    myArray.forEach((ele) =>{
        ele.src=`../images/pause.svg`
    })
}
function allBackground(){
    let myArray = Array.from(document.getElementsByClassName('queue')[0].getElementsByClassName('song'));
    myArray.forEach((ele) =>{
        ele.style.background = "rgba(230, 230, 230, 0.0)";
    })
}

// song_array.forEach((item) => {
//     item.addEventListener('click', (ele) => {
//         let song_id = ele.target.id;
//         console.log(song_id);
//         music.src=`../songs/song${song_id}.mp3`;
//         current_image.src= `../images/song${song_id}.jpg`;
        
//         let songname = songs.find((e) => {
//             return e.id==song_id;
//         })

//         current_song.innerHTML=songname.song_name; 

//         music.play();
//         // console.log(music.src);
//     })
// })

console.log('ok');
