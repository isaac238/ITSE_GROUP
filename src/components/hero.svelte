<div class="background">
    <div class="container">
        <h1>ModernFit Gym</h1>
        <p>Lorem ipsum dolor sit amet.</p>
    </div>
</div>

<style>
    .background {
        width: 100%;
        height: 50rem;
        position: relative;
        background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.stylist.co.uk%2Fimages%2Fapp%2Fuploads%2F2020%2F07%2F31161953%2Fhow-to-choose-a-weight-gym-1680x880.jpg%3Fw%3D1680%26h%3D880%26fit%3Dmax%26auto%3Dformat%252Ccompress&f=1&nofb=1&ipt=0d1856ea70480ece7ed4bddbf0c1402ff311ed385fb47e333796b5e9b0793b04&ipo=images");
        background-size: cover;
    }

    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .background::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(
            0,
            0,
            0,
            0.5
        ); /* Adjust the opacity (0.5 for 50% black) */
    }

    h1 {
        margin-bottom: 0;
    }
    p {
        font-weight: 300;
    }
</style>
