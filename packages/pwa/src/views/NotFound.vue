<template>
    <div class="w-full h-screen bg-cover flex justify-center items-center" style="background-image: url(../../../../../src/images/bg-mobile.png); background-size: auto 100%; background-repeat: no-repeat; background-attachment: fixed;">
        <div class="bg-white w-[80%] h-fit drop-shadow-lg rounded-lg flex flex-col justify-between items-center py-4">
            <div class="flex flex-col justify-center items-center">
                <h1 class="font-header text-8xl text-custom-orange">404</h1>
                <h2 class="font-body font-bold">Oeps deze pagina bestaat niet</h2>
            </div>
            <!-- <iframe src="https://giphy.com/embed/60QZQ4JNETQHshpPwU" width="90%" height="480" frameBorder="0" class="giphy-embed" ></iframe> -->
            <router-link to="/" class="lex justify-center items-center w-[90%] rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 mt-6">Keer terug</router-link>
        </div>
    </div>
</template>


