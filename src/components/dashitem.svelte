<script>
    export let customSlots; //not used currently as it's not connected to db.
</script>

<div class="dashboard-item">
    <slot />
</div>

<style>
  .dashboard-item {
    background-color: #857AFF;
    border-radius: 1rem;
    width: fit-content;
    min-width: 20rem;
    max-width: 40rem;
    height: 15rem;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .dashboard-item p { /* These are used when generating dashboard items, they aren't unused, ignore error - Reef.*/
    font-size: 16px; /* Feel free to change the font-size to relative if you feel like it */
  }

  .dashboard-item h1 {
    font-size: 24px;
    color: #333;
  }
</style>