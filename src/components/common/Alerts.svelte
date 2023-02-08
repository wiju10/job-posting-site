<script>
	import { alerts } from '../../utils/alerts';
	import { afterNavigate } from '$app/navigation';

	let alertType = null;
	let alertMessage = null;

	function resetAlerts() {
		if ($alerts.message && $alerts.type) {
			alerts.clearAlert();
		} else {
			alertType = $alerts.type;
			alertMessage = $alerts.message;
		}
	}

	$: if (alerts.message && $alerts.type) {
		alertType = $alerts.type;
		alertMessage = $alerts.message;
	}
	afterNavigate(() => resetAlerts());
</script>

{#if alertMessage}
	<div class="alert alert-{alertType} shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{alertMessage}</span>
		</div>
	</div>
{/if}
