export async function allDetail(){
    let searchResult;
  
    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/trending_today/I3kvhipIy73uCJW60TJk1Q__`).then(function (response) {
      console.log(response.data[0]);
      searchResult=response.data[0];
    }).catch(function (error) {
      console.error(error);
    });
  
    trackDetail.trackTitle=searchResult.song;
    trackDetail.trackArtists=searchResult.artistMap;
    trackDetail.trackImage=searchResult.image;
    trackDetail.trackUrl=searchResult.media_url;
    trackDetail.trackDuration=searchResult.duration;
    trackDetail.trackId=searchResult.Id;
  
    return trackDetail;
  }