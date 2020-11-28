import { ipcRenderer } from 'electron';
import { remote } from 'electron';
import { shell } from 'electron';
import { EventEmitter } from 'events';

let system = {

	events: new EventEmitter (),
	
	send (tag, data)
	{
		ipcRenderer.send (tag, data);
	},

	close ()
	{
		ipcRenderer.send ('close');
	},

	minimize ()
	{
		let window = remote.getCurrentWindow();
		window.minimize ();
	},

	fullscreen ()
	{
		let window = remote.getCurrentWindow();
		if (process.platform === 'darwin')
		{
			window.setFullScreen (!window.isFullScreen ());
		}
		else
		{
			if (!window.isMaximized()) 
			{
				window.maximize();          
			} 
			else 
			{
				window.unmaximize();
			}
		}
	},
	openLink (url)
	{
		shell.openExternal(url);
	},
	platform ()
	{
		return 'electron';
	},
	getVersion ()
	{
		return 
	}
};

export function setup (options, imports, register) {
	
	ipcRenderer.on ('close-ask', () => {
		system.events.emit ('close-ask');
	});

	ipcRenderer.on ('update-ask', () => {
		system.events.emit ('update-ask');
	});

	register (null, { system });
}
