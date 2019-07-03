export const fetchVideoTitle = (title, token = null) => {
  const url = 'https://www.googleapis.com/youtube/v3';
  const key = 'AIzaSyD0iUEmbwxIYLe99hFKX0VVZNXeZys5QHM';
  const snippet = token
    ? `${url}/search?key=${key}&type=video&part=snippet&maxResults=15&q=${title}&pageToken=${token}`
    : `${url}/search?key=${key}&type=video&part=snippet&maxResults=15&q=${title}`

  return fetch(snippet)
    .then(res => res.json())
    .then(data => {
      const token = data.nextPageToken;
      const vids = data.items.map(elem => elem.id.videoId).join(',');
      const statUrl = `${url}/videos?key=${key}&id=${vids}&part=snippet,statistics`;

      return fetch(statUrl)
        .then(res => res.json())
        .then(data => {
          return {
            data: data.items,
            token,
            title
          }
        });
    });
}
