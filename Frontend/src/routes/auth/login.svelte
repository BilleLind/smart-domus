<script lang="js">

	let email = '',
		password = '';
	export let errors;

	async function submit() {
		const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'post',
			credentials: 'include',
			body: JSON.stringify({ email, password } || {}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((r) => r);

		content = await response;
		console.log(content);
		errors = await response.errors;
	}
</script>

{#if errors}
	<ul class="error-messages">
		{#each Object.keys(errors) as key}
			<li>{key} {errors[key]}</li>
		{/each}
	</ul>
{/if}

<form on:submit|preventDefault={submit}>
	<input type="email" placeholder="email" bind:value={email} />
	<input type="password" placeholder="password" bind:value={password} />
	<button> Login </button>
</form>