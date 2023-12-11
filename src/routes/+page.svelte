<script>
    import Nav from "../components/nav.svelte";
    import background from '$lib/assets/background.jpg'
    import card1 from '$lib/assets/card1.jpg'
    import card2 from '$lib/assets/card2.jpg'
    import card3 from '$lib/assets/card3.jpg'
    import card4 from '$lib/assets/card4.jpg'
    import card5 from '$lib/assets/card5.jpg'
    import card6 from '$lib/assets/card6.jpg'
</script>

<Nav />

<!-- 
I've added a basic hero element here to get you started

Feel free to use DaisyUI components to familiarize yourself with Tailwind. 

Please do not use Vanilla CSS when creating this page, utility classes or tailwind @apply 's only.
-->

<div
    class="hero min-h-screen"
    style="background-image: url({background});"
>
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md text-white">
            <h1 class="mb-5 text-5xl font-bold">Welcome to ModernFit Gym</h1>
            <p class="mb-5">
                Elevate Your Strength! Overcome Your Limits!
            </p>
            <a href="/register"
                class="btn bg-white text-black hover:bg-black hover:text-white shadow-2xl border-none"
                >Join Us Now!
            </a>
        </div>
    </div>  
</div>
<div class="relative -top-20">
    <p class="mb-5 relative flex justify-evenly -top-10 text-white text-2xl">
        Learn More About Us Below!
    </p>
    <div class="grid grid-cols-3 justify-items-center gap-y-12">
        <div class="card w-96 bg-base-100 shadow-2xl">
            <figure><img src={card1} alt="Man doing a dumbbell bicep curl" /></figure>
            <div class="card-body">
            <h2 class="card-title">Weights!</h2>
            <p>
                Our gym is equipped with a comprehensive range of top-notch weight lifting equipment to cater to fitness enthusiasts of all levels!
            </p>
            <details class="collapse collapse-arrow bg-base-200 px-5 mt-4">
                <summary class="collapse-title font-medium">Click for a list of our facilities!</summary>
                <div class="collapse-content">
                    <ul class="list-disc ml-3">
                        <li>Barbells, Dumbbells, and Weight Plates</li>
                        <li>Squat Rack</li>
                        <li>Smith Machines</li>
                        <li>Bench Press</li>
                        <li>Cable Machines</li>
                        <li>Rowing Machines</li>
                        <li>Lat Pulldown Machines</li>
                        <li>Assisted Pull Up Machines</li>
                        <li>Leg Press, Extension, and Seated Curl Machines</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-2xl">
            <figure><img src={card2} alt="Woman running on treadmill"/></figure>
            <div class="card-body">
            <h2 class="card-title">Cardio!</h2>
            <p>
                Revitalize your fitness journey with our cutting-edge cardio equipment, 
                meticulously curated to transform your workouts and elevate your heart-pumping experience!
            </p>
            <details class="collapse collapse-arrow bg-base-200 px-5 mt-4">
                <summary class="collapse-title font-medium">Click for a list of our facilities!</summary>
                <div class="collapse-content">
                    <ul class="list-disc ml-3">
                        <li>Treadmill</li>
                        <li>Elliptical Trainer</li>
                        <li>Upright and Recumbent Bike Machines</li>
                        <li>Stair Climber</li>
                        <li>Cable Machines</li>
                        <li>Cross-trainer</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={card3} alt="Woman working out with personal trainer"/></figure>
            <div class="card-body">
            <h2 class="card-title">Personal Trainers!</h2>
            <p>
                ModernFit Gym has some of the best personal trainers the world has to offer! We provide one-on-one sessions
                with our trainers to help guide you with targeted workouts, ensuring proper form and motivation. As a 
                member of our gym, you will have access to our online system where your trainer can assign you highly
                 efficient, personalised workout plans, tailored exactly to your goals!              
            </p>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={card4} alt="Vegetables" /></figure>
            <div class="card-body">
            <h2 class="card-title">Meal Planning Made Easy!</h2>
            <p>
                Want to get on a diet or eat healther but don't know where to start? Don't worry, our system can help!
                By becoming a member of ModernFit Gym, you will gain access to our nutrition system which lists all
                of the important macros of any food or meal you can think of. Calories, protein, vitamins, you name it!
                Mix and match the meals you like to create the perfect diet to give your body the strength it needs to
                meet your goals. Our personal trainers are also always happy to help with the process.
            </p>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={card5} alt="Chicken and vegetables"/></figure>
            <div class="card-body">
            <h2 class="card-title">Meal Tracking!</h2>
            <p>
                Our meal logging system is a user-friendly and efficient tool designed to help you track and manage your 
                daily food intake effortlessly. Our meal logs make use of our nutrition system and lets you easily input 
                any meal or food you've eaten throughout the day, automatically filling in all of the calories and nutrients
                to make logging your meals as easy as possible.
            </p>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={card6} alt="Notebook"/></figure>
            <div class="card-body">
            <h2 class="card-title">Workout Tracking!</h2>
            <p>
                Our patented workout log system is second to none! Our system is a comprehensive fitness tool that 
                allows you to meticulously track and manage your exercise routine. It features a user-friendly interface with 
                customizable profiles, enabling you to record detailed workout sessions, including exercises, sets, reps, and weights. 
                Paired with all of our facilities and online systems, our workout tracker will give you everything you need to meet
                your fitness goals!
            </p>
            </div>
        </div>
    </div>
</div>