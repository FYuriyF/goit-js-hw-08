import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const VAULT_KEY = 'videoplayer-current-time';
const savedTime = localStorage.getItem(VAULT_KEY) || 0;

player.on('timeupdate', throttle(getCurrentTime, 500));
player.setCurrentTime(savedTime);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

function getCurrentTime(evt) {
  localStorage.setItem(VAULT_KEY, evt.seconds);
}
