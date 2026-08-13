# 🎵 Spotify Clone

A responsive Spotify-inspired music streaming web application built with React and Vite.

This project was initially developed by following a YouTube tutorial to understand React, component-based architecture, music player functionality, and frontend development. After completing the tutorial, I extended the project by implementing a **Recently Played** feature with persistent listening history using LocalStorage.

## 🚀 Live Demo

🔗 **Live Demo:** https://spotify-clone-bi3c.vercel.app/

🔗 **GitHub Repository:** https://github.com/snehithabollam/SPOTIFY-CLONE.git

---

## ✨ Features

### 🎧 Music Player

- Play and pause songs
- Previous and next song controls
- Song progress bar
- Volume control
- Album and song information
- Music playback using HTML5 Audio

### 🔀 Playback Controls

- Shuffle songs
- Repeat songs
- Navigate between tracks
- Select songs from albums/playlists

### 🔎 Search

- Search interface for finding songs and albums

### ❤️ Library

- Browse available music
- Access albums and playlists
- Like/favorite interface

### 📱 Responsive UI

- Spotify-inspired modern interface
- Responsive layout
- Sidebar navigation
- Music player section

---

# 🆕 Recently Played — Custom Feature

After completing the original tutorial project, I added a **Recently Played** feature to improve the application's functionality.

### Features included:

- 🎵 Playing a song automatically adds it to Recently Played
- 🔝 The latest played song appears first
- 🔄 Playing the same song again moves it to the top
- 🚫 Duplicate songs are not stored
- 💾 Recently Played history is stored using `localStorage`
- 🔄 History survives page refreshes
- 🧹 Only the latest 10 songs are stored
- ▶️ Clicking a Recently Played song plays it again

### Example

```text
Recently Played

1. Latest Played Song
2. Previous Song
3. Earlier Song
...
10. Oldest Song
