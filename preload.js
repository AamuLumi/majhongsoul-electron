const { webFrame, ipcRenderer } = require('electron');

window.addEventListener('load', () => {
	ipcRenderer.send('game-loading');

	const registerDiscordRPCTriggers = setInterval(() => {
		if (!window.GameMgr || !window.GameMgr.Inst) {
			return;
		}

		window.GameMgr.Inst._EnterLobby = window.GameMgr.Inst.EnterLobby;

		window.GameMgr.Inst.EnterLobby = function (...args) {
			ipcRenderer.send('enter-lobby');
			window.GameMgr.Inst._EnterLobby(...args);
		};

		window.GameMgr.Inst._EnterMJ = window.GameMgr.Inst.EnterMJ;

		window.GameMgr.Inst.EnterMJ = function (...args) {
			ipcRenderer.send('enter-mj');
			window.GameMgr.Inst._EnterMJ(...args);
		};

		clearInterval(registerDiscordRPCTriggers);
	}, 1000);
});
