<script>
  import { onMount } from 'svelte';

  let count = 0;
  let disks = [];

  async function fetchDisks() {
    const response = await fetch('http://localhost:8000/disks');
    disks = await response.json();
  }

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  onMount(fetchDisks);
</script>

<svelte:head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>

<main class="container text-center">
  <h1 class="text-danger text-uppercase font-weight-light">Disk List</h1>

  <textarea class="form-control" rows="10" readonly>{JSON.stringify(disks, null, 2)}</textarea>

  <button class="btn btn-primary my-3" on:click={fetchDisks}>Fetch Disks</button>

  <h1 class="text-danger text-uppercase font-weight-light">Counter: {count}</h1>
  <button class="btn btn-success mx-1" on:click={increment}>Increase</button>
  <button class="btn btn-danger mx-1" on:click={decrement}>Decrease</button>
</main>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .card {
    width: 70%;
    height: 50%;
  }
</style>