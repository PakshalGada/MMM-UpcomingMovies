const NodeHelper = require('node_helper');
const fetch = require('node-fetch');

module.exports = NodeHelper.create({
  start: function() {
    console.log('MMM-UpcomingMovies helper started');
  },

  socketNotificationReceived: function(noti, config) {
    if (noti === 'FETCH_MOVIES') {
      this.fetchUpcoming(config);
    }
  },

  fetchUpcoming: async function(config) {
    try {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.apiKey}&region=${config.region}&page=1`;
      console.log('MMM-UpcomingMovies: Fetching from URL:', url.replace(config.apiKey, 'API_KEY_HIDDEN'));
      
      const res = await fetch(url);
      const json = await res.json();
      
      if (json && json.results) {
        console.log('MMM-UpcomingMovies: Received', json.results.length, 'movies');
        console.log('MMM-UpcomingMovies: First few movie titles:', 
          json.results.slice(0, 5).map(m => m.title).join(', '));
        
        this.sendSocketNotification('MOVIES_RESULT', json.results);
      } else {
        console.log('MMM-UpcomingMovies: Invalid response structure:', json);
      }
    } catch (e) {
      console.log('MMM-UpcomingMovies fetch error:', e.message);
    }
  }
});