let trackDetail = {
  trackImage:'',
  trackUrl:'',
  trackTitle:'',
  trackArtists:[],
  trackDuration:'',
  trackLink:''
}

export async function allDetail(songname){

  let searchResult;

  await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=${songname}`).then(function (response) {
    // console.log(response.data);
    searchResult=response.data;
  }).catch(function (error) {
    console.error(error);
  });

  trackDetail.trackTitle=searchResult.song;
  trackDetail.trackArtists=searchResult.primary_artists;
  trackDetail.trackImage=searchResult.image;
  trackDetail.trackUrl=searchResult.media_url;
  trackDetail.trackDuration=searchResult.duration;
  trackDetail.trackId=searchResult.Id;
  trackDetail.trackLink=searchResult.perma_url;
  return trackDetail;
}