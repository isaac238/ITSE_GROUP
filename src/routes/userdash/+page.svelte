<script>
    import DashItem from '../../components/dashitem.svelte';
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
                <DashItem>
                    <h1>Hello World!</h1>
                    <p>This is a dynamically loading component!</p>
                    <p>Pass whatever you want in here!</p>
                    <p>We'll pass data from the DB into here through props.</p>
                </DashItem>
        </div>
    </div>
</div>

<style>
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
                grid-area: main;
                background-color: #FFFF;
                margin-right: 1rem;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }
                .welcome {
                    background-color: #857AFF;
                    margin: 1rem;
                    border-radius: 1rem;
                    width: 40rem;
                    height: 15rem;
                    padding: 1rem;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

                }

            .side-bar,
            .dash-container {
                border-radius: 1rem;
                height: 100vh;
                margin-bottom: 1rem;
                margin-left: 1rem;
                margin-top: 1rem;
            }
</style>