<script>
	import '../app.css';
	import Header from '../components/common/Header.svelte';
	import Alerts from '../components/common/Alerts.svelte';
</script>

<Header />
<div class="container mx-auto">
	<Alerts />
	<slot />
</div>

<div class="mt-28" />
