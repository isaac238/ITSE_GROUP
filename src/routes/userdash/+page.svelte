<script>
    import DashItem from '../../components/dashitem.svelte';
	import 'iconify-icon';

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
            <ul style="height: 100%;">
                <a href="#" style="color: #857AFF;">Dashboard</a>
                <a href="#">Workout Plans</a>
                <a href="#">Nutrition Planner</a>
				<a href="/logout" style="margin-top: auto; margin-bottom: 3rem; display:inline-flex; align-items: center; gap: .25rem;"><iconify-icon icon="mdi:logout"/>Logout</a>
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

                align-content: flex-start; 
                align-items: flex-start; 
                justify-content: flex-start;
            }

            .side-bar,
            .dash-container {
                border-radius: 1rem;
                margin-bottom: 1rem;
                margin-left: 1rem;
                margin-top: 1rem;
            }
</style>
