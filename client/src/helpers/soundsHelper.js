import bomb from '../sounds/bomb drop.wav';

const loadSounds = () => {
	var allsounds = {};
	var raw = sounds;

	allsounds = {'sounds' : [
		{ "id":"Mål!!!", "sound": sounds['goalshout.wav']},
		{ "id":"Assist", "sound": sounds['applause.wav']},
		{ "id":"Skud på mål", "sound": sounds['pleased with that.wav']},
		{ "id":"Tager hjørne", "sound": sounds['this task was appointed to you.wav']},
		{ "id":"Medic!", "sound": sounds['medic get the shot.wav']},
		{ "id":"Offside", "sound": sounds['Over the line.wav']},
		{ "id":"Frispark begået", "sound": sounds['what is your problem.wav']},
		{ "id":"Skud udenfor mål", "sound": sounds['nervous - first time.wav']},
		{ "id":"Straffe begået", "sound": sounds['moron.wav']},
		{ "id":"Gult kort", "sound": sounds['Letter.wav']},
		{ "id":"Udskiftet", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Selvmål", "sound": sounds['silly farts.wav']},
		{ "id":"Brændt straffe", "sound": sounds['he chose poorly.wav']},
		{ "id":"Rødt kort", "sound": sounds['Turn out the lights.wav']}, 
		{ "id":"Spiller bolden", "sound": sounds['applause.wav']}, /*REFEREE her fra*/
		{ "id":"Kalder spiller hen", "sound": sounds['kalder på Wilson.wav']},
		{ "id":"Spray (1/situation)", "sound": sounds['Beverage.wav']},
		{ "id":"Publikum spotter kamera", "sound": sounds['fanfare rocky.wav']},
		{ "id":"1H 0-2 min", "sound": sounds['time is precious.wav']},
		{ "id":"VARevognen", "sound": sounds['everything under control.wav']},
		{ "id":"Dommerkast", "sound": sounds['need a drink.wav']},
		{ "id":"2H 0-3 min", "sound": sounds['not a lot of time.wav']},
		{ "id":"VARcheck sidelinje", "sound": sounds['no tv.wav']},
		{ "id":"1H 3+ min", "sound": sounds['waiting.wav']},
		{ "id":"2H 4+ min", "sound": sounds['waiting.wav']},
		{ "id":"Ramt af bold/spiller", "sound": sounds['jabba laugh.wav']},
		{ "id":"Falder", "sound": sounds['refhitbyball.wav']},
		{ "id":"Udskiftes", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Start", "sound": sounds['fanfare.wav']},
		{ "id":"Worst Worm Egen (rød)", "sound": sounds['open and drink.wav']},
		{ "id":"Best Worm Andre (grøn)", "sound": sounds['need a drink.wav']},
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