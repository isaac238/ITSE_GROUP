<main>
    <div class="hero min-h-screen overflow-hidden">
        <enhanced:img 
            src="$lib/assets/webp/background-L.webp" 
            alt="Man running on a treadmill" 
            sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
            class="min-h-screen min-w-fit object-cover"
            />
        <div class="hero-overlay bg-opacity-60" />
        <div class="hero-content h-full flex-col place-content-evenly text-center text-neutral-content"> 
            <div class="max-w-md mt-auto text-white">
                <h1 class="mb-5 text-5xl font-bold">Welcome to ModernFit Gym</h1>
                <p class="mb-5">
                    Elevate Your Strength! Overcome Your Limits!
                </p>
                <a href="#subscriptions"
                    class="btn bg-white text-black hover:bg-black hover:text-white shadow-2xl border-none"
                    >Join Us Now!
                </a>
            </div> 
            <a href="#cards"
                class="mb-28 mt-auto justify-text-center text-white text-2xl"
                >Learn more about us below!
            </a>
        </div>  
    </div> 

    <div class="relative -top-20 justify-items-center"> 
        <div id="cards" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 justify-items-center">
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-2xl overflow-hidden">
                <enhanced:img 
                    src="$lib/assets/jpg/card1-L.jpg" 
                    alt="Man lifting dumbbell"             
                    sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                    loading="lazy"
                    class="w-full"
                    />
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
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-2xl ">

                    <enhanced:img 
                        src="$lib/assets/jpg/card2-L.jpg" 
                        alt="Woman doing cardio" 
                        sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                        loading="lazy"
                        class="w-full"
                    />

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
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-xl overflow-hidden">
                <enhanced:img 
                    src="$lib/assets/jpg/card3-L.jpg" 
                    alt="Personal trainer training" 
                    sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                    loading="lazy"
                    class="w-full"
                    />
                <div class="card-body">
                <h2 class="card-title">Personal Trainers!</h2>
                <p>
                    ModernFit Gym has wide variety of highly qualified personal trainers! We provide one-on-one sessions
                    with our trainers to help guide you with targeted workouts, ensuring proper form and motivation. As a 
                    member of our gym, you will have access to our online system where your trainer can assign you highly
                    efficient, personalised workout plans, tailored exactly to your goals!              
                </p>
                </div>
            </div>
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-xl overflow-hidden">
                <enhanced:img 
                    src="$lib/assets/jpg/card4-L.jpg" 
                    alt="Plates of vegetables" 
                    sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                    loading="lazy"
                    class="w-full"
                    />
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
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-xl overflow-hidden">
                    <enhanced:img 
                        src="$lib/assets/jpg/card5-L.jpg" 
                        alt="A healthy meal" 
                        sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                        loading="lazy"
                        class="w-full"
                        />
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
            <div class="card w-11/12 lg:hover:border-slate-300 lg:hover:scale-105 bg-base-100 border-2 border-slate-700 shadow-xl overflow-hidden">
                <enhanced:img 
                    src="$lib/assets/jpg/card6-L.jpg" 
                    alt="Motivational quote saying make it happen" 
                    sizes="(min-width:600px) 600px, (min-width:500px) 500px, (min-width:300px) 300px"
                    loading="lazy"
                    class="w-full"
                    />
                <div class="card-body">
                <h2 class="card-title">Workout Tracking!</h2>
                <p>
                    Our workout log system is second to none! Our system is a comprehensive fitness tool that 
                    allows you to meticulously track and manage your exercise routine. It features a user-friendly interface with 
                    customizable profiles, enabling you to record detailed workout sessions, including exercises, sets, reps, and weights. 
                    Paired with all of our facilities and online systems, our workout tracker will give you everything you need to meet
                    your fitness goals!
                </p>
                </div>
            </div>
        </div>
    </div>  
    <div class="mb-10">
        <h1 class="mb-5 text-5xl font-bold text-white text-center">Subscription Plans</h1>
    </div>
    <div id="subscriptions" class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-12 mb-10">
        <div class="card w-3/4 lg:w-7/12 bg-base-100 lg:hover:border-slate-300 lg:hover:scale-105 shadow-xl border-2 border-slate-700 rounded-md">
            <div class="card-body">
                <h2 class="card-title text-white underline decoration-1 underline-offset-8">1 Month Plan</h2>
                <p>Available For:</p>
                <p class="text-white text-xl">£14.99 Per Month<p>
                <p>£14.99 <strong>Total</strong>, 0% Discount</p>
                <p>£179.88 <strong>Total</strong> if subscribed to this plan for 12 months</p>
                <ul class="list-disc ml-5 mb-8">
                    <li>Full Access To Gym</li>
                    <li>A Personal Trainer</li>
                    <li>All online resources and tools</li>
                </ul>
                <div class="card-actions justify-end">
                    <a href="/register"
                    class="btn bg-white mb-3 text-black hover:bg-black hover:text-white shadow-2xl border-none"
                    >Choose Plan
                    </a>
                </div>
            </div>
        </div>
        <div class="card w-3/4 lg:w-7/12 bg-base-100 lg:hover:border-slate-300 lg:hover:scale-105 shadow-xl border-2 border-slate-700 rounded-md">
            <div class="card-body">
                <h2 class="card-title text-white underline decoration-1 underline-offset-8">6 Month Plan</h2>
                <p>Available For:</p>
                <p class="text-white text-xl">£13.49 Per Month<p>
                <p>£80.94 <strong>Total</strong>, 10% Discount</p>
                <p>£161.88 <strong>Total</strong> if subscribed to this plan for 12 months</p>
                <ul class="list-disc ml-5 mb-8">
                    <li>Full Access To Gym</li>
                    <li>A Personal Trainer</li>
                    <li>All online resources and tools</li>
                    <li>Access to the gym sauna</li>
                </ul>
                <div class="card-actions justify-end">
                    <a href="/register"
                    class="btn bg-white mb-3 text-black hover:bg-black hover:text-white shadow-2xl border-none"
                    >Choose Plan
                    </a>
                </div>
            </div>
        </div>
        <div class="card w-3/4 lg:w-7/12 bg-base-100 lg:hover:border-slate-300 lg:hover:scale-105 shadow-xl border-2 border-slate-700 rounded-md">
            <div class="card-body">
                <h2 class="card-title text-white underline decoration-1 underline-offset-8">12 Month Plan</h2>
                <p>Available For:</p>
                <p class="text-white text-xl">£11.99 Per Month<p>
                <p>£143.88 <strong>Total</strong>, 20% Discount</p>
                <p class="text-white">Save up to £36 by subscribing for 12 months!</p>
                <ul class="list-disc ml-5 mb-8">
                    <li>Full Access To Gym</li>
                    <li>A Personal Trainer</li>
                    <li>All online resources and tools</li>
                    <li>Access to the gym sauna</li>
                    <li>Free monthly newsletter, including many healthy recipes to try out</li>
                </ul>
                <div class="card-actions justify-end">
                    <a href="/register"
                    class="btn bg-white mb-3 text-black hover:bg-black hover:text-white shadow-2xl border-none"
                    >Choose Plan
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>
