<script>
    import Nav from "../components/nav.svelte";
    import background from '$lib/assets/background.jpg'
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
                class="btn bg-white text-black hover:bg-black hover:text-white border-none"
                >Join Us Now!
            </a>
        </div>
    </div>  
</div>
<div class="relative -top-20">
    <p class="mb-5 relative flex justify-evenly -top-10 text-white text-2xl">
        Learn More About Us Below!
    </p>
    <div class="grid grid-cols-3 justify-items-center gap-y-10">
        <div class="card w-96 h-fit bg-base-100 shadow-2xl">
            <figure><img src="src\lib\assets\card1.jpg" alt="Man doing a dumbbell bicep curl" /></figure>
            <div class="card-body">
            <h2 class="card-title">Weights!</h2>
            <p>
                Our gym is equipped with a comprehensive range of top-notch weight lifting equipment to cater to fitness enthusiasts of all levels!
            </p>
            <details class="collapse collapse-arrow bg-base-200 mt-4">
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
        <div class="card w-96 h-fit bg-base-100 shadow-2xl">
            <figure><img src="src\lib\assets\card2.jpg" alt="Woman running on treadmill"/></figure>
            <div class="card-body">
            <h2 class="card-title">Cardio!</h2>
            <p>
                Revitalize your fitness journey with our cutting-edge cardio equipment, 
                meticulously curated to transform your workouts and elevate your heart-pumping experience!
            </p>
            <details class="collapse collapse-arrow bg-base-200 mt-4">
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
        <div class="card w-96 h-fit bg-base-100 shadow-xl">
            <figure><img src="src\lib\assets\card3.jpg" alt="Woman working out with personal trainer" /></figure>
            <div class="card-body">
            <h2 class="card-title">Personal Trainers!</h2>
            <p>
                ModernFit Gym has some of the best personal trainers in all of Sheffield! We offer one-on-one sessions
                with our trainers to help guide you with targeted workouts, ensuring proper form and motivation. As a 
                member of our gym, you will have access to our online system where your trainer can assign you highly
                 efficient, personalised workout plans, tailored exactly to your goals!              
            </p>
            </div>
        </div>
        <div class="card w-96 h-fit bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
        <div class="card w-96 h-fit bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
        <div class="card w-96 h-fit bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
        </div>
    </div>
</div>