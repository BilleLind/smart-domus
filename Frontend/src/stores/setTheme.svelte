<script>
	import { theme } from './storage.js';

	function setTheme() {
		if ($theme.mode === 'light') {
			$theme.mode = 'dark';
			documentUpdate($theme.mode, 'light');
			theme.set($theme);
		} else {
			$theme.mode = 'light';
			documentUpdate($theme.mode, 'dark');
			theme.set($theme);
		}
	}
	function documentUpdate(mode, previous) {
		if (previous === 'dark') {
			document.documentElement.classList.remove(previous);
		}
		if (mode === 'dark') {
			document.documentElement.classList.add(mode);
		}
	}
</script>

<button on:click={setTheme} aria-label="Theme switcher, dark or light">
	{$theme.mode}
</button>
