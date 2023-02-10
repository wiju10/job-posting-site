<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { authenticateUser, getUserId, isValidToken, isLoggedIn } from '../../../utils/auth';
	import { alerts } from '../../../utils/alerts';

	let formErrors = {};
	let loadStatus = false;

	async function createJob(evt) {
		evt.preventDefault();

		const jobData = {
			user: getUserId(),
			title: evt.target['title'].value,
			minAnnualCompensation: evt.target['minAnnualCompensation'].value,
			maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
			description: evt.target['description'].value,
			requirements: evt.target['requirements'].value,
			applicationInstructions: evt.target['applicationInstructions'].value,
			location: evt.target['location'].value,
			employer: evt.target['employer'].value
		};

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(jobData)
		});

		alerts.setAlert('Job Successfully Posted!', 'success');
		goto('/');
	}
</script>

<svelte:head>
	<title>Create a Job Listing | Jobz</title>
</svelte:head>

<h1 class="text-center text-xl">Create a Job Listing</h1>
<div class="container mx-auto">
	<form on:submit={createJob}>
		<div class="form-control w-full">
			<label class="label" for="title">
				<span class="label-text">Title</span>
			</label>
			<input type="text" name="title" class="input input-bordered w-full" required />
		</div>

		<div class="form-control w-full">
			<label class="label" for="minAnnualCompensation">
				<span class="label-text">Minimum Annual Compensation</span>
			</label>
			<input
				type="number"
				name="minAnnualCompensation"
				class="input input-bordered w-full"
				required
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="maxAnnualCompensation">
				<span class="label-text">Maximum Annual Compensation</span>
			</label>
			<input
				type="number"
				name="maxAnnualCompensation"
				class="input input-bordered w-full"
				required
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<input type="text" name="description" class="input input-bordered w-full" required />
		</div>

		<div class="form-control w-full">
			<label class="label" for="location">
				<span class="label-text">Location</span>
			</label>
			<input type="text" name="location" class="input input-bordered w-full" required />
		</div>

		<div class="form-control w-full">
			<label class="label" for="employer">
				<span class="label-text">Employer</span>
			</label>
			<input type="text" name="employer" class="input input-bordered w-full" required />
		</div>

		<div class="form-control w-full">
			<label class="label" for="requirements">
				<span class="label-text">Requirements</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-64"
				name="requirements"
				placeholder=""
				required
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="applicationInstructions">
				<span class="label-text">Application Instructions</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-64"
				name="applicationInstructions"
				placeholder=""
				required
			/>
		</div>

		<div class="form-control w-full mt-4">
			<button on:click{spinner} class="btn btn-md {loadStatus ? 'loading' : ''}"
				>Create a Job</button
			>
		</div>
	</form>
</div>
