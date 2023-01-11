import songapi from './songapi.json' assert {type: 'json'};

let api = [...songapi];

let tar = document.getElementsByClassName('content')[0];

for(let i=0;i<20;i++){
    tar.innerHTML+=`<li class="song">
                            
    <img src="${api[i].artworkUrl}" alt="">   
    <img class="play_icon" id="${api.id}" src="../images/play.svg" alt=""> 
    <h4>${api[i].title}</h4>
    <h5>${api[i].artist}</h5>
    <i class="bi bi-heart-fill" style="color:#e81224;"></i>
    


</li>`
}