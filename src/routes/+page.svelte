<script>
    import Nav from "../components/nav.svelte";
</script>

<Nav />

<!-- 
I've added a basic hero element here to get you started

Feel free to use DaisyUI components to familiarize yourself with Tailwind. 

Please do not use Vanilla CSS when creating this page, utility classes or tailwind @apply 's only.
-->

<div
    class="hero min-h-screen"
    style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);"
>
    <div class="hero-overlay bg-opacity-60" />
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md text-white">
            <h1 class="mb-5 text-5xl font-bold">Welcome to ModernFit Gym</h1>
            <p class="mb-5">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maxime, laborum.
            </p>
            <button
                class="btn bg-white text-black hover:bg-black hover:text-white border-none"
                >See what we have to offer</button
            >
        </div>
    </div>
</div>
