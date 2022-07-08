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
		{ "id":"Spray (1/situation)", "sound": sounds['where to go.wav']},
		{ "id":"Publikum spotter kamera", "sound": sounds['happycrowd.wav']},
		{ "id":"Målspark i feltet", "sound": sounds['silly farts.wav']},
		{ "id":"VARevognen", "sound": sounds['everything under control.wav']},
		{ "id":"Dommerkast", "sound": sounds['need a drink.wav']},
		{ "id":"Udskiftning 1. halvleg", "sound": sounds['everything under control.wav']},
		{ "id":"VARcheck sidelinje", "sound": sounds['no tv.wav']},
		{ "id":"Taber ting", "sound": sounds['lost a nail.wav']},
		{ "id":"5. udskiftning", "sound": sounds['waiting.wav']},
		{ "id":"Ramt af bold/spiller", "sound": sounds['jabba laugh.wav']},
		{ "id":"Falder", "sound": sounds['bomb drop.wav']},
		{ "id":"Udskiftes", "sound": sounds['you have failed me for the last time.wav']},
		{ "id":"Start", "sound": sounds['fanfare.wav']},
		{ "id":"Worst Worm Egen (rød)", "sound": sounds['open and drink.wav']},
		{ "id":"Best Worm Andre (grøn)", "sound": sounds['need a drink.wav']},
		{ "id":"Bank", "sound": sounds['kaching.wav']},
		{ "id":"terminate", "sound":sounds['cannon.wav']},
		{ "id":"gameover", "sound":sounds['bigben.wav']},
	]};

	return allsounds;
}

const playSound = (id) => {
	var allSounds = loadSounds();

	let currentSound = allSounds.sounds.find(sound => sound.id === id);
	new Audio(currentSound.sound).play(); 
}

function importAll(importedFiles) {
	let sounds = {};
	importedFiles.keys().map((item, index) => { sounds[item.replace('./', '')] = importedFiles(item); });
	return sounds;
}

const sounds = importAll(require.context('../sounds/', false, /\.(wav)$/));

export default {
	loadSounds,
	playSound,
}