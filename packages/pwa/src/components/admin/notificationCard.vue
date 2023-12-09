<template>
    <div class="row-span-full col-span-2 p-6 bg-white rounded-lg shadow-md col-start-6">
      <h1 class="text-2xl font-bold font-body">Bericht</h1>
      <div  class="flex flex-col justify-between h-full">
        <p class="my-4">Het bericht is voor: </p>
        <div class="flex flex-row w-full items-center justify-around">
            <div>
                <input type="checkbox" id="all" name="all" value="all" class="mr-2">
                <label for="all">Iedereen</label>
            </div>
            <div>
                <input type="checkbox" id="visitors" name="visitors" value="visitors" class="mr-2">
                <label for="visitors">Bezoekers</label>
            </div>
        </div>
        <div class="flex flex-row w-full items-center justify-around">
            <div>
                <input type="checkbox" id="artists" name="artists" value="artists" class="mr-2">
                <label for="artists">Artiesten</label>
            </div>
            <div>
                <input type="checkbox" id="personel" name="personel" value="personel" class="mr-2">
                <label for="personel">Personeel</label>
            </div>
        </div>
        <textarea
          placeholder="Typ hier je mededeling"
          name=""
          id=""
          cols="50"
          rows="3"
          class="w-full block font-pop border-2 rounded-md p-1 focus:outline-none focus:border-4 focus:border-white bg-white my-6 h-full"
        ></textarea>

        <button @click="sendMessage"
          class="py-1 bg-custom-purple text-white my-6 rounded w-1/2 self-end"
        >
          VERZEND
        </button>
    </div>
    </div>
</template>


<script lang="ts">

export default {

  setup() {
    return {
        sendMessage,
    }
  },
}

const sendMessage = () => {
  console.log('send')
}
</script>