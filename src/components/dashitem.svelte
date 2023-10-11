<script>
    export let customSlots;
</script>

<div class="dashboard-item">
    <slot />
</div>

<style>
  .dashboard-item {
    background-color: #857AFF;
    margin: 1rem;
    border-radius: 1rem;
    width: fit-content;
    min-width: 20rem;
    max-width: 40rem;
    height: 15rem;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .dashboard-item p {
    font-size: 16px;
  }

  .dashboard-item h1 {
    font-size: 24px;
    color: #333;
  }
</style>