<script>
	import { goto } from '$app/navigation';
	import { alerts } from '../../utils/alerts';
	import { authenticateUser } from '../../utils/auth';

	let formErrors = {};
	let loadStatus = false;

	async function loginUser(evt) {
		loadStatus = true;

		const userData = {
			username: evt.target['username'].value,
			password: evt.target['password'].value
		};

		const res = await authenticateUser(userData.username, userData.password);

		if (res.success) {
			alerts.setAlert('Login successful!', 'success');
			goto('/');
		} else {
			alerts.setAlert('Login failed due to incorrect username/password.', 'error');
			setTimeout(() => alerts.clearAlert(), 1000);
		}

		loadStatus = false;
	}
</script>

<svelte:head>
	<title>Login | Jobz</title>
</svelte:head>

<h1 class="text-center text-xl">Sign-In</h1>
<div class="flex justify-center items-center mt-8">
	<form on:submit|preventDefault={loginUser} class="w-1/3">
		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="johndoe"
				class="input input-bordered w-full"
				required
			/>
			{#if 'username' in formErrors}
				<label class="label" for="username">
					<span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full">
			<label class="label" for="password">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				placeholder=""
				class="input input-bordered w-full"
				required
			/>
			{#if 'password' in formErrors}
				<label class="label" for="password">
					<span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
				</label>
			{/if}
		</div>

		<div class="form-control w-full mt-4">
			<button class="btn btn-md {loadStatus ? 'loading' : ''}">Login</button>
		</div>
	</form>
</div>
