Module.register("MMM-UpcomingMovies", {
  defaults: {
    apiKey: null,
    region: 'US',
    maxResults: 10,
    updateInterval: 1000 * 60 * 60, 
    rotateInterval: 15000 
  },

  start: function() {
    if (!this.config.apiKey) {
      Log.error("MMM-UpcomingMovies: You must set config.apiKey");
      return;
    }
    this.movies = [];
    this.currentIndex = 0;
    this.rotateTimer = null;
    this.sendSocketNotification('FETCH_MOVIES', this.config);
    this.scheduleUpdate();
  },

  scheduleUpdate: function() {
    setInterval(() => {
      this.sendSocketNotification('FETCH_MOVIES', this.config);
    }, this.config.updateInterval);
  },

  startSlideshow: function() {
    if (this.rotateTimer) {
      clearInterval(this.rotateTimer);
      this.rotateTimer = null;
    }
    
    if (this.movies && this.movies.length > 1) {
      Log.info("MMM-UpcomingMovies: Starting slideshow with " + this.movies.length + " movies");
      this.rotateTimer = setInterval(() => {
        const oldIndex = this.currentIndex;
        this.currentIndex = (this.currentIndex + 1) % this.movies.length;
        Log.info("MMM-UpcomingMovies: Rotating from movie " + oldIndex + " to " + this.currentIndex);
        this.updateDom(300); 
      }, this.config.rotateInterval);
    } else {
      Log.info("MMM-UpcomingMovies: Not starting slideshow - only " + (this.movies ? this.movies.length : 0) + " movies");
    }
  },

  getStyles: function() {
    return ["MMM-UpcomingMovies.css"];
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti === 'MOVIES_RESULT') {
      this.movies = payload.slice(0, this.config.maxResults);
      this.currentIndex = 0;
      Log.info("MMM-UpcomingMovies: Received " + this.movies.length + " movies");
      this.updateDom();
      this.startSlideshow();
    }
  },

  getDom: function() {
    const wrapper = document.createElement('div');
    wrapper.className = 'mmm-upcoming-wrapper';
    
    if (!this.movies || this.movies.length === 0) {
      const empty = document.createElement('div');
      empty.innerHTML = 'No upcoming movies found.';
      wrapper.appendChild(empty);
      return wrapper;
    }

    const movie = this.movies[this.currentIndex];
    const item = document.createElement('div');
    item.className = 'movie-item movie-slide';
    
    const img = document.createElement('img');
    img.className = 'poster';
    img.src = movie.poster_path ? ('https://image.tmdb.org/t/p/w300' + movie.poster_path) : '';
    img.alt = movie.title;
    
    const meta = document.createElement('div');
    meta.className = 'meta';
    
    const title = document.createElement('div');
    title.className = 'title';
    title.innerText = movie.title;
    
    const date = document.createElement('div');
    date.className = 'release';
    date.innerText = movie.release_date || '';

    if (movie.overview) {
      const overview = document.createElement('div');
      overview.className = 'overview';
      overview.innerText = movie.overview.length > 200 ? 
        movie.overview.substring(0, 200) + '...' : movie.overview;
      meta.appendChild(overview);
    }
    
    meta.appendChild(title);
    meta.appendChild(date);
    
    item.appendChild(img);
    item.appendChild(meta);
    wrapper.appendChild(item);

 
    
    return wrapper;
  },

  suspend: function() {
    if (this.rotateTimer) {
      clearInterval(this.rotateTimer);
    }
  },

  resume: function() {
    this.startSlideshow();
  }
});
