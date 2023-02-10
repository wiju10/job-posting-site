<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import humanize from 'humanize-plus';
	import SvelteMarkdown from 'svelte-markdown';
	import { getTokenFromLocalStorage, getUserId } from '../../../utils/auth';
	export let data;
	import { goto } from '$app/navigation';

	async function deleteJob() {
		if (window.confirm('Are you sure?')) {
			const jobData = {
				id: null
			};

			const resp = await fetch(
				PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
				{
					method: 'DELETE',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Authorization: getTokenFromLocalStorage()
					},
					body: JSON.stringify(jobData)
				}
			);
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Job Details | Jobz</title>
</svelte:head>
{#if getUserId() == data.job.user}
	<button class="btn btn-outline" on:click={goto(`./${data.job.id}/edit`)}>Edit Job</button>
	<button class="btn btn-outline" on:click={deleteJob}>Delete Job</button>
{/if}
<div class="mt-10">
	<div class="flex">
		<div class="flex-1">
			<h1 class="text-3xl font-extrabold">{data.job.title}</h1>
			<p class="text-xl">{data.job.employer}</p>
		</div>
	</div>

	<div class="flex flex-row w-full mt-8">
		<div class="basis-2/3 prose max-w-none w-full">
			<h2 class="text-xl font-thin">Description</h2>
			<SvelteMarkdown source={data.job.description} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Requirements</h2>
			<SvelteMarkdown source={data.job.requirements} />
			<div class="mt-6" />
			<h2 class="text-xl font-thin">How to Apply?</h2>
			<p>{data.job.applicationInstructions}</p>
		</div>
		<div class="basis-1/3 ml-4">
			<h2 class="text-xl font-thin">Location</h2>
			<p>{data.job.location}</p>
			<div class="mt-6" />
			<h2 class="text-xl font-thin">Salary Range</h2>
			<p>
				USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
					data.job.maxAnnualCompensation
				)}
			</p>
		</div>
	</div>
</div>
