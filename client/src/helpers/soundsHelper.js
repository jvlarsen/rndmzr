import bomb from '../sounds/bomb drop.wav';

const loadSounds = () => {
	var allsounds = {};
	var raw = sounds;

	allsounds = {'sounds' : [
		{ "id":"Mål!!!", "sound": sounds['goalshout.wav'], "refsound": sounds['pingo.wav']},
		{ "id":"Assist", "sound": sounds['holy_cow_x.wav']},
		{ "id":"Skud på mål", "sound": sounds['applause.wav']},
		{ "id":"Tager hjørne", "sound": sounds['this task was appointed to you.wav']},
		{ "id":"Medic!", "sound": sounds['Letter.wav']},
		{ "id":"Offside", "sound": sounds['Over the line.wav']},
		{ "id":"Frispark begået", "sound": sounds['1000dollars.wav']},
		{ "id":"Skud udenfor mål", "sound": sounds['Letter.wav']},
		{ "id":"Straffe begået", "sound": sounds['applause.wav']},
		{ "id":"Gult kort", "sound": sounds['Letter.wav']},
		{ "id":"Udskiftet", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Selvmål", "sound": sounds['applause.wav']},
		{ "id":"Brændt straffe", "sound": sounds['1000dollars.wav']},
		{ "id":"Rødt kort", "sound": sounds['Turn out the lights.wav']}, 
		{ "id":"Spiller bolden", "sound": sounds['applause.wav']}, /*REFEREE her fra*/
		{ "id":"Sætter sig igennem", "sound": sounds['1000dollars.wav']},
		{ "id":"Spray (1/situation)", "sound": sounds['Letter.wav']},
		{ "id":"Publikum spotter kamera", "sound": sounds['applause.wav']},
		{ "id":"1H 0-2 min", "sound": sounds['1000dollars.wav']},
		{ "id":"VARevognen", "sound": sounds['Letter.wav']},
		{ "id":"Dommerkast", "sound": sounds['applause.wav']},
		{ "id":"2H 0-3 min", "sound": sounds['1000dollars.wav']},
		{ "id":"VARcheck sidelinje", "sound": sounds['Letter.wav']},
		{ "id":"1H 3+ min", "sound": sounds['applause.wav']},
		{ "id":"2H 4+ min", "sound": sounds['1000dollars.wav']},
		{ "id":"Ramt af bold/spiller", "sound": sounds['Letter.wav']},
		{ "id":"Falder", "sound": sounds['applause.wav']},
		{ "id":"Udskiftes", "sound": sounds['you have failed me for the last time.wav']},
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