const { AutoClient } = require('discord-auto-rpc');

function getRoundText(n) {
	if (n === 0) {
		return 'Starting game';
	} else {
		return `Round ${n}`;
	}
}

module.exports = class DiscordRPC {
	constructor() {
		this.currentRound = -1;
		this.client = new AutoClient({ transport: 'ipc' });
	}

	_setActivity = (args) => {
		const completedArgs = {
			...args,
			largeImageKey: 'logo',
		};

		this.client.setActivity(completedArgs);
	};

	connect = () => {
		this.client.once('ready', () => {
			this.setLobbyActivity();
		});

		this.client.endlessLogin({ clientId: '934052399478362142' });
	};

	disconnect = () => {
		this.client.destroy();
	};

	setLobbyActivity = () => {
		this._setActivity({
			details: 'Waiting in the lobby',
		});
		this.currentRound = -1;
	};

	setMJActivity = () => {
		this.currentRound++;
		this._setActivity({
			details: 'In a game',
			state: getRoundText(this.currentRound),
			startTimestamp: Date.now(),
		});
	};
};
