<script>
    import DashItem from '../../components/dashitem.svelte';

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

<div class="container">
    <div class="layout-container">
        <div class="side-bar">
            <ul>
                <a href="#" style="color: #857AFF;">Dashboard</a>
                <a href="#">Workout Plans</a>
                <a href="#">Nutrition Planner</a>
            </ul>
        </div>
        <div class="dash-container">
            {#each items as item}
                <DashItem>
                    <h1>{item.title}</h1>
                    <p>{item.content}</p>
                </DashItem>
            {/each}
        </div>
    </div>
</div>

<style>
    :global(body),
    :global(html) {
        box-sizing: border-box;
    }

    .container {
        color: white;
    }
        .layout-container {
            display: grid;
            grid-template-areas:
            'side main'
            'side main';
            grid-template-columns: 20rem auto;
            background-color: #ffff;
            min-height: 100vh;
            height: fit-content;
        }
            .side-bar {
                grid-area: side;
                background-color: #F4F3F3;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }
                .side-bar ul {
                    display: flex;
                    flex-direction: column;
                }
                    .side-bar a {
                        margin: 1rem;
                        text-decoration: none;
                        color: black;
                    }

                    .side-bar a:hover {
                        color: #857AFF;
                    }
            .dash-container {
                display: flex;
                flex-wrap: wrap;
                grid-area: main;
                background-color: #FFFF;
                margin-right: 1rem;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

                align-content: flex-start; /* Adjust to your desired alignment */
                align-items: flex-start;  /* Align items within each row */
                justify-content: flex-start; /* Align items horizontally */
            }

            .side-bar,
            .dash-container {
                border-radius: 1rem;
                margin-bottom: 1rem;
                margin-left: 1rem;
                margin-top: 1rem;
            }
</style>