<script>
	import Header from '../components/common/Header.svelte';
	import '../app.css';
	import Alerts from '../components/common/Alerts.svelte';
</script>

<Header />
<div class="container mx-auto">
	<Alerts />
	<slot />
</div>

<div class="mt-28" />
