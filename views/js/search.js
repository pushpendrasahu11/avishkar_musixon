var searchbutton=document.getElementById('searchbutton');
var searchresult = document.getElementById('searchresultbox');

searchbutton.addEventListener('click', async ()=>{
    let searchbar=document.getElementById('searchbar').value;
    console.log(searchbar)
    if(searchbar!=""){
        await axios.get(`https://saavn.me/search/songs?query=${searchbar}&page=1&limit=20`)
        .then((res)=>{
            let searchcontent=res.data.data.results;
            console.log(searchcontent);

            searchresult.innerHTML="";
            
            if(searchcontent.length==0){
                searchresult.innerHTML += `<img src="../images/notfound.gif" alt="Result not found" />`
            }

            for (let j = 0; j < searchcontent.length; j++) {
        
                searchresult.innerHTML += `<li>
                    <div class="image_play">
                        <img src="${searchcontent[j].image[2].link}" alt="">
                        <img class="search_play_icon" id="${searchcontent[j].url}" src="../images/play.svg" alt="">
                    </div>
                    <div>
                    <h5 style="font-size:15px" >${searchcontent[j].name}</h5>
                    <h5>${searchcontent[j].primaryArtists}</h5>
                    </div>
            </li>`
            }

            searchresult.classList.add("bigbox");
            // alert('done')
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
})


document.addEventListener('click',(e)=>{
    if(e.target.id !== 'searchbutton' && e.target.id !=='searchresultbox'){
        console.log('closed search');
        searchresult.classList.remove("bigbox");
    }
})