<script lang="js">
	let email = '',
		password = '',
		role = 'administrator',
		errors = null,
		content;
	async function submit(event) {
		const response = await fetch('http://localhost:5000/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify({ email, password, role } || {}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((r) => r.json());

		content = await response;
		console.log(content);
		errors = await response.errors;
	}
</script>

<form on:submit|preventDefault={submit}>
	<input type="email" required placeholder="email" bind:value={email} />
	<input type="password" required placeholder="password" bind:value={password} />
	<input type="text" required placeholder="role" bind:value={role} />
	<button type="submit"> Sign Up </button>
</form>

{#if errors}
	<p>errors</p>
	<ul class="error-messages">
		{#each Object.keys(errors) as key}
			<li>{key} {errors[key]}</li>
		{/each}
	</ul>
{/if}

{#if content}
	{content.status + 'content'}
{/if}
