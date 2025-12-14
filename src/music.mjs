const $audioControls = document.getElementById('audio-controls')
const $button = $audioControls.querySelector('button')
const $audio = $audioControls.querySelector('audio')

const playingIcon = '<img src="img/audio-play-icon.svg" alt="Playing (click to mute)">'
const mutedIcon = '<img src="img/audio-mute-icon.svg" alt="Muted (click to play)">'

$button.addEventListener('click', function () {
	if ($audio.paused) {
		$audio.play()
		this.innerHTML = playingIcon
		localStorage.removeItem('music-muted')
	} else {
		$audio.pause()
		this.innerHTML = mutedIcon
		localStorage.setItem('music-muted', '1')
	}
})

if (localStorage.getItem('music-muted')) {
	$button.innerHTML = mutedIcon
} else {
	$button.innerHTML = playingIcon

	// liable to be blocked by browser autoplay policy, in which case
	// the promise rejects, and we wait for a user interaction to start the audio
	$audio.play().catch(() => {
		const ac = new AbortController()
		const { signal } = ac
		for (const event of ['click', 'keyup']) {
			document.body.addEventListener(event, (e) => {
				if (e.target !== $button) {
					$audio.play()
					ac.abort()
				}
			}, { signal })
		}
	})
}
