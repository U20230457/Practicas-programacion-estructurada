const songs = [
    {title: 'jazzy smile', artist: '#', src: '#', cover: '../img/jazzy-smile.jpg'},
    {title: 'spirit of fire', artist: '#', src: '#', cover: '../img/spirit-of-fire.jpg'}
]

let currentSongIndex = 0, isPlaying = false, audio

function playCurrentSong() {
    if(audio){
        audio.stop()
    }

    audio = new Howl({
        src: [songs[currentSongIndex].src],
        autoplay: isPlaying,
        volume: volumeSlider.value,
        onend: ()=>{
            playNextSong()
        }
    })

    updateSongInfo()
}

const playButton = document.getElementById('play')
const pauseButton = document.getElementById('pause')
const nextButton = document.getElementById('next')
const prevButton = document.getElementById('prev')
const volumeSlider = document.getElementById('volume')
const songTitle = document.getElementById('songTitle')
const songArtist = document.getElementById('songArtist')
const albumCover = document.querySelector('.card-img-top')

playButton.addEventListener('click', ()=>{
    isPlaying = true
    playCurrentSong()
})

pauseButton.addEventListener('click', ()=>{
    isPlaying= false
    audio.pause()
})

nextButton.addEventListener('click', ()=>{
    playNextSong()
})

prevButton.addEventListener('click', ()=>{
    if(audio.seek() > 5){
        audio.seek(0)
    }else {
        currentSongIndex = (currentSongIndex - 1 + song.length) % sonds.length
        playCurrentSong()
    }
})

volumeslider.addEventListener('input', ()=>{
    audio.volume( volumeslider.value )
})

function updateSongInfo(){
    songTitle.textContent = songs[currentSongIndex].title
    songArtist.textContent = songs[currentSongIndex].artist
    albumCover.src = songs[currentSongIndex].cover
}

function playNextSong(){
    currentSongIndex = (currentSongIndex + 1 ) % song.length
    playCurrentSong()
}

playCurrentSong()