import bomb from '../sounds/bomb drop.wav';

const loadSounds = () => {
	/*
		Der skal laves et json-objekt der holder event-navnet og dets tilhørende lyd.
		Så returnerer jeg det objekt og kan slå op direkte på lydens navn eller på eventet.
	*/
debugger;
	var allsounds = {};
	var raw = sounds;

	allsounds = {'sounds' : [
		{ "id":"mål", "sound": sounds['goalshout.wav']},
		{ "id":"mål", "sound": sounds['moron.wav']},
		{ "id":"mål", "sound": sounds['applause.wav']},
		{ "id":"mål", "sound": sounds['1000dollars.wav']},
		{ "id":"mål", "sound": sounds['Letter.wav']},
	]};

	return allsounds;
}

const getSoundFromEvent = (event) => {

}

function importAll(s) {
	let sounds = {};
	s.keys().map((item, index) => { sounds[item.replace('./', '')] = s(item); });
	return sounds;
}

const sounds = importAll(require.context('../sounds/', false, /\.(wav)$/));

export default {
	loadSounds,
	getSoundFromEvent
}