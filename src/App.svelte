<script>
  import { onMount } from 'svelte';
  // Removed: import { pb } from './lib/pocketbase';

  let count = 0;
  let disks = [];

  const loadDisks = async () => {
    try {
      const response = await fetch('http://localhost:8000/disks/');
      disks = await response.json();
    } catch (error) {
      console.error('Error loading disks:', error);
    }
  };

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  onMount(loadDisks);

  let newDisk = {
    main_stat: {
      name: '',
      value: 0,
      level: 0
    },
    sub_stats: []
  };

  const addDisk = async () => {
    try {
      const response = await fetch('http://localhost:8000/disks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDisk)
      });
      const result = await response.json();
      alert('Disk added successfully!');
    } catch (error) {
      console.error('Error adding disk:', error);
    }
  };
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>

<main class="p-4 mx-auto text-center" style="width: 80%;">
  <article class="rounded-xl border border-gray-700 bg-gray-800 p-4">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div class="lg:col-span-2">
        <div class="rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="overflow-x-auto rounded-t-lg">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
              <thead class="ltr:text-left rtl:text-right">
                <tr>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Name</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Main Stat Value</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Main Stat Level</th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">Sub Stats</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                {#each disks as disk}
                  <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">{disk.main_stat.name}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{disk.main_stat.value}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">{disk.main_stat.level}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      <ul>
                        {#each disk.sub_stats as sub}
                          <li>{sub.name}: {sub.value} (Level: {sub.level})</li>
                        {/each}
                      </ul>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
          <div class="rounded-b-lg border-t border-gray-200 px-4 py-2 dark:border-gray-700">
            <button class="bg-blue-500 text-white py-2 px-4 rounded my-3" on:click={loadDisks}>Fetch Disks</button>
          </div>
        </div>
      </div>
      <div>
        <article class="rounded-xl border border-gray-700 bg-gray-800 p-4">
          <form on:submit|preventDefault={addDisk} class="space-y-2">
            <input class="border p-2 w-full" bind:value={newDisk.main_stat.name} placeholder="Main Stat Name" />
            <input class="border p-2 w-full" type="number" bind:value={newDisk.main_stat.value} placeholder="Main Stat Value" />
            <input class="border p-2 w-full" type="number" bind:value={newDisk.main_stat.level} placeholder="Main Stat Level" />
            <!-- Add logic to add sub-stats if necessary -->
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">Add Disk</button>
          </form>
        </article>
      </div>
    </div>
  </article>
</main>