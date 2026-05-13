const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    file: "assets/audio/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    file: "assets/audio/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    file: "assets/audio/song3.mp3"
  }
];

let currentSongIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const songList = document.getElementById("song-list");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  audio.load();
}

function playPauseAudio() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

playBtn.addEventListener("click", playPauseAudio);

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100 || 0;

  currentTimeDisplay.textContent = formatTime(currentTime);
  durationDisplay.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function buildPlaylist() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      audio.play();
      playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    });
    songList.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSongIndex);
  buildPlaylist();
  volume.value = 0.5;
  audio.volume = 0.5;
});
