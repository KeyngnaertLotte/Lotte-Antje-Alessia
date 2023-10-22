<template>
      <div class="col-span-2 row-start-5 bg-custom-purple flex justify-between mx-4  rounded-md h-[7rem] p-2">
        <div class="text-white font-bold flex flex-col w-2/5 gap-2">
          <p class="font-body text-xl mx-2">Saldo</p>
          <p class="font-pop text-4xl self-center">€ 0,00</p>
        </div>
        <button class="bg-white px-4 py-2 text-custom-purple rounded-md font-pop font-bold mx-4 self-center">VOEG TOE</button>
      </div>
      <div class="mx-4 bg-white row-start-9 p-4 rounded-md col-span-2 row-span-15">
        <p class="font-body text-xl font-bold">TRANSACTIES</p>
        <div class="font-pop text-lg mt-5">
          <div v-for="(transactie, index) in transacties" :key="index" :class="['flex', 'justify-between', transactieColor(transactie.naam)]">
            <p>{{ transactie.naam }}</p>
            <p>{{ transactie.bedrag }}</p>
          </div>
        </div>
      </div>
  </template>
  
  <script lang="ts">
    export default {
        components: {
        },
        setup() {
            const transactieColor = (naam: string) => {
                if (naam === "Saldo Verhoging") {
                    return "text-custom-darkGreen";
                } else {
                    return "text-custom-orange";
                }
            };
         
            return { transacties, transactieColor };
        }
    };

    const transacties = [
      {
        naam: "Barnaam 1",
        bedrag: "- € 13.24",
      },
      {
        naam: "Barnaam 2",
        bedrag: "- € 23.33",
      },
      {
        naam: "FoodStand 5",
        bedrag: "- € 70.33",
      },
      {
        naam: "FoodStand 2",
        bedrag: "- € 7.85",
      },
      {
        naam: "Saldo Verhoging",
        bedrag: "+ € 23.33",
      },
      {
        naam: "Barnaam 13",
        bedrag: "- € 3.15",
      },
      {
        naam: "FoodStan 1",
        bedrag: "- € 45.85",
      },
    ]
  </script>