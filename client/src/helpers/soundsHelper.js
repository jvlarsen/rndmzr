const loadSounds = () => {
	var allsounds = {};

	allsounds = {'sounds' : [
		{ "id":"Mål!!!", "sound": sounds['goalshout.wav']},
		{ "id":"Assist", "sound": sounds['applause.wav']},
		{ "id":"Skud på mål", "sound": sounds['pleased with that.wav']},
		{ "id":"Tager hjørne", "sound": sounds['this task was appointed to you.wav']},
		{ "id":"Medic!", "sound": sounds['hospital.wav']},
		{ "id":"Offside", "sound": sounds['Over the line.wav']},
		{ "id":"Frispark begået", "sound": sounds['what is your problem.wav']},
		{ "id":"Skud udenfor mål", "sound": sounds['nervous.wav']},
		{ "id":"Straffe begået", "sound": sounds['moron.wav']},
		{ "id":"Gult kort", "sound": sounds['Letter.wav']},
		{ "id":"Udskiftet", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Selvmål", "sound": sounds['testicle.wav']},
		{ "id":"Brændt straffe", "sound": sounds['he chose poorly.wav']},
		{ "id":"Rødt kort", "sound": sounds['Turn out the lights.wav']}, 
		{ "id":"Spiller bolden", "sound": sounds['applause.wav']}, /*REFEREE her fra*/
		{ "id":"Kalder spiller hen", "sound": sounds['two holes.wav']},
		{ "id":"Spray (1/situation)", "sound": sounds['click.wav']},
		{ "id":"Publikum spotter kamera", "sound": sounds['happycrowd.wav']},
		{ "id":"Målspark i feltet", "sound": sounds['silly farts.wav']},
		{ "id":"VARevognen", "sound": sounds['everything under control.wav']},
		{ "id":"Dommerkast", "sound": sounds['need a drink.wav']},
		{ "id":"2H 0-3 min", "sound": sounds['not a lot of time.wav']},
		{ "id":"VARcheck sidelinje", "sound": sounds['no tv.wav']},
		{ "id":"Taber ting", "sound": sounds['lost a nail.wav']},
		{ "id":"2H 4+ min", "sound": sounds['waiting.wav']},
		{ "id":"Ramt af bold/spiller", "sound": sounds['jabba laugh.wav']},
		{ "id":"Falder", "sound": sounds['bomb drop.wav']},
		{ "id":"Udskiftes", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Start", "sound": sounds['fanfare.wav']},
		{ "id":"Worst Worm Egen (rød)", "sound": sounds['open and drink.wav']},
		{ "id":"Best Worm Andre (grøn)", "sound": sounds['need a drink.wav']},
	]};

	return allsounds;
}

function importAll(s) {
	let sounds = {};
	s.keys().map((item, index) => { sounds[item.replace('./', '')] = s(item); });
	return sounds;
}

const sounds = importAll(require.context('../sounds/', false, /\.(wav)$/));

export default {
	loadSounds
}