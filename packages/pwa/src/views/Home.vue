<template class="bg-[#DFE6DA]">
    <div class="relative bg-[#DFE6DA]">
        <div class="absolute w-full grid grid-rows-5">
            <router-link to="/auth/login" class="justify-self-end m-4 row-span-1"><p class="font-body font-bold text-white text-3xl ">LOGIN</p></router-link>
            <div class="flex flex-col items-end row-span-4 justify-center  justify-self-center">
                <p class="font-header font-bold text-white text-7xl">Lotantsia</p>
                <p class="font-header font-bold text-white text-5xl">Festival</p>
            </div>
        </div>
        <img src="../images/bg-small.png" alt="" class="w-screen">
    </div>
    <div class="bg-primary">
        <AppLineUp/>
        <AppFooter/>
    </div>
</template>

<script lang="ts" setup>
    import AppLineUp  from "../components/AppLineUp.vue";
    import AppFooter from "../components/AppFooter.vue";

</script>