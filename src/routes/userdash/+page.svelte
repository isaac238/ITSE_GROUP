<script>
	import Nav from '../../components/nav.svelte';
    import DashItem from '../../components/dashitem.svelte';
	import 'iconify-icon';

	export let data;
	const user = data.user;
	console.log(user);

    let items = [
    {
      title: 'Item 1',
      content: 'This is the content for Item 1.',
    },
    {
      title: 'Item 2',
      content: 'This is the content for Item 2.',
    },
    {
      title: 'Item 3',
      content: 'This is the content for Item 3.',
    },
    {
        title: 'Item 4',
        content: 'This is the content for Item 4',
    },
    {
        title: 'Item 4',
        content: 'This is the content for Item 4',
    },
  ];
</script>

<Nav/>
<div class="relative w-screen h-screen bg-neutral-200"> <!-- Set the width and height of the parent div -->
    <div class="absolute inset-0 m-5 rounded-xl flex gap-4">
        <div class="w-1/6 rounded-xl p-10 bg-neutral-100 shadow-lg flex flex-col justify-between">
            <ul>
              <li class="pb-10"><a href="/userdash" class="text-purple-500">Dashboard</a></li>
              <li class="pb-10"><a href="/workoutplanner" class="hover:text-purple-500 text-neutral-800">Workout Plans</a></li>
            </ul>
            <ul class="self-end w-[100%]">
                <li>
                    <a href="/logout" class="text-neutral-800 flex items-center hover:text-red-400">
                      <iconify-icon icon="mdi:logout"/>
                      <span class="ml-2">Logout</span>
                    </a>
                  </li>
            </ul>
          </div>
          
          <div class="w-5/6 bg-neutral-100 rounded-xl shadow-lg flex flex-wrap justify-items-start">
            <div class="w-[100%] rounded-xl flex flex-wrap h-fit gap-10 m-10">
                {#each items as item}
                    <DashItem>
                        <h1 class="text-white">{item.title}</h1>
                        <p class="text-white">{item.content}</p>
                    </DashItem>
                {/each}
            </div>
            
        </div>
    </div>
  </div>
  
<style>
</style>
