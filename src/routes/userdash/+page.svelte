<script>
  import { writable } from "svelte/store";
  import Nav from "../../components/nav.svelte";
  import MobileItem from "../../components/MobileItem.svelte";
  import DesktopItem from "../../components/DesktopItem.svelte";

  export let data; //Importing data so page isn't static, for route guarding (DO NOT DELETE)..

  const navState = writable("Dashboard");

  function updateNavState(state) {
    //Sets nav state for single page navigation
    navState.set(state);
  }
</script>

{#if $navState == "Dashboard"}
  <h1>Dashboard</h1>
{:else if $navState == "Workout"}
  <h1>Workout</h1>
{:else if $navState == "Nutrition"}
  <h1>Nutrition</h1>
{/if}

<div class="w-screen h-screen flex flex-col items-center bg-transparent">
  <ul class="menu menu-horizontal rounded-xl my-2 p-0 h-fit">
    <button
      on:click={() => updateNavState("Nutrition")}
      class="btn-sm bg-slate-800 rounded-lg mx-1">Nutrition</button
    >
    <button
      on:click={() => updateNavState("Workout")}
      class="btn-sm bg-slate-800 rounded-lg mx-1">Workout</button
    >
    <button
      on:click={() => updateNavState("Dashboard")}
      class="btn-sm bg-slate-800 rounded-lg mx-1">Dashboard</button
    >
  </ul>

  <div
    class="md:hidden flex snap-x snap-mandatory overflow-x-auto p-4 space-x-4 bg-neutral w-screen flex-grow"
  >
    <MobileItem title="Component Title" subtitle="Subtitle" description="description"/>
    <MobileItem title="Component Title" subtitle="Subtitle" description="description"/>
    <MobileItem title="Component Title" subtitle="Subtitle" description="description"/>
    <MobileItem title="Component Title" subtitle="Subtitle" description="description"/>
    <MobileItem title="Component Title" subtitle="Subtitle" description="description"/>
  </div>

  <div
    class="hidden md:flex flex-wrap items-center w-4/6 h-5/6 rounded-xl overflow-y-auto gap-7 p-4"
  >
    <DesktopItem title="Title" subtitle="Subtitle" description="Description" />
    <DesktopItem title="Title" subtitle="Subtitle" description="Description" />
    <DesktopItem title="Title" subtitle="Subtitle" description="Description" />
    <DesktopItem title="Title" subtitle="Subtitle" description="Description" />
    <DesktopItem title="Title" subtitle="Subtitle" description="Description" />
  </div>
</div>
