<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="relative bg-white w-9/10 h-3/4 rounded-lg flex flex-col items-center p-6"
    >
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex justify-end bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <button
        @click="toggleFavorite"
        class="font-body font-bold text-3xl flex flex-row justify-center items-center gap-2"
      >
        {{ currentArtist.artistName }}
        <p v-if="isBezoeker" class="h-12 w-12 flex justify-center items-center">
          <Heart :class="heartColor" />
        </p>
      </button>
      <p class="font-body text-xl">{{ currentArtist.time }}</p>
      <div
        class="flex flex-col justify-center items-center lg:flex-row h-auto lg:h-full"
      >
        <img
          :src="currentArtist.imgLink"
          :alt="currentArtist.artistName"
          class="my-6 lg:mx-10 lg:w-1/3"
        />
        <div>
          <p class="text-lg text-justify">
            {{
              $t(
                `detail.info.${currentArtist.artistName
                  .replace(/\s+/g, '.')
                  .toLowerCase()}`,
              )
            }}
          </p>
          <br />
          <p class="text-lg text-justify">
            {{
              $t(
                `detail.top.${currentArtist.artistName
                  .replace(/\s+/g, '.')
                  .toLowerCase()}`,
              )
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { Heart, X } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { useQuery } from '@vue/apollo-composable'
import { GET_FAVOARTISTS_BY_ID } from '@/graphql/bezoeker.query'
import {
  ADD_FAVOARTIEST,
  REMOVE_FAVOARTIEST,
} from '@/graphql/bezoeker.mutation'
import useCustomUser from '@/composables/useCustomUser'
const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const heartColor = ref('w-10 h-10 fill-none')
const favorite = ref(false)
import { GET_LINEUP } from '@/graphql/artiest.query'

const times = ref<any | null>(null)

const artistList = [
  {
    artistName: 'Tom Mish',
    time: '20:15 - 21:30',
    imgLink:
      'https://dynamicmedia.livenationinternational.com/Media/d/d/q/5144376b-4ee0-4dbf-abf5-47f9f299c333.jpeg',
  },
  {
    artistName: 'Brihang',
    time: '22:00 - 23:15',
    imgLink:
      'https://img.demorgen.be/a249145fe8c71ed30203c48b50aa56baf2dbadd1/brihang-ik-schrijf-het-liefst-in-de-taal-die-ik-spreek-tegen-mijn-vrouw',
  },
  {
    artistName: 'BeRightBack',
    time: '23:45 - 01:00',
    imgLink: 'https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif',
  },
  {
    artistName: 'Bohnes',
    time: '20:00 - 21:30',
    imgLink:
      'https://i.pinimg.com/originals/b6/c0/40/b6c040aa27f8b71db3b840115f87ae3f.jpg',
  },
  {
    artistName: 'Aston',
    time: '20:15 - 21:30',
    imgLink: 'https://i.ytimg.com/vi/U0v0n3b0bEY/maxresdefault.jpg',
  },
  {
    artistName: 'NF',
    time: '23:00 - 00:30',
    imgLink:
      'https://www.rollingstone.com/wp-content/uploads/2019/08/Main-Press-Image-NF-John-Taylor-Sweet-.jpg?w=1581&h=1054&crop=1',
  },
  {
    artistName: 'TheFatRat',
    time: '20:00 - 21:00',
    imgLink:
      'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/1/30/vlvkjrvv6blsypp3njkb/dj-the-fat-rat-bilder',
  },
  {
    artistName: 'Neffex',
    time: '21:15 - 22:15',
    imgLink:
      'https://imageio.forbes.com/specials-images/imageserve/5da6105ddb402600062023c0/NEFFEX--Left-to-right--Bryce-Savage-and-Cameron-Wales--Photo-by-Jonathan-Weiner-/960x0.jpg?format=jpg&width=960',
  },
  {
    artistName: 'BoyWithUke',
    time: '22:30 - 23:30',
    imgLink:
      'https://dynamicmedia.livenationinternational.com/o/d/o/0aaaedde-17fa-41c7-abe0-d5e58cd9069b.png',
  },
  {
    artistName: 'Imagine Dragons',
    time: '23:45 - 00:45',
    imgLink:
      'https://www.coca-cola.com/content/dam/onexp/global/central/offerings/coke-studio/artists/2_Imagine_Dragons_by_Eric_Ray_Davidson_GREEN_04_16-9.jpg',
  },
]

export default {
  props: {
    artist: {
      type: String,
      required: true,
    },
    modalState: {
      type: Boolean,
      required: true,
    },
    isBezoeker: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close-modal'],
  components: {
    Heart,
    X,
  },

  setup(props, { emit }) {
    function closeModal() {
      emit('close-modal')
    }

    const { mutate: addFavoArtiest } = useMutation(ADD_FAVOARTIEST)
    const { mutate: removeFavoArtiest } = useMutation(REMOVE_FAVOARTIEST)
    const isBezoeker = ref(props.isBezoeker)

    const currentArtist = ref()

    artistList.forEach(element => {
      if (element.artistName === props.artist) {
        currentArtist.value = element
      }
    })

    const { refetch, onResult } = useQuery(GET_FAVOARTISTS_BY_ID, { uid })

    onResult(result => {
      if (result.data) {
        for (const artiest of result.data.bezoekersFavorite) {
          // console.log(artiest.artiest)
          const doesIt = artiest.artiest.includes(
            currentArtist.value.artistName.toUpperCase(),
          )
          // console.log(doesIt)
          if (doesIt)
            heartColor.value =
              'w-10 h-10 fill-custom-darkGreen stroke-custom-darkGreen'
          else heartColor.value = 'w-10 h-10 fill-none'
        }
      }
    })

    const toggleFavorite = () => {
      //   console.log("before", favorite.value);
      favorite.value = !favorite.value
      //   console.log(props.artist)
      //   console.log(uid)
      if (favorite.value) {
        addFavoArtiest({ uid: uid, artiest: props.artist.toUpperCase() })
          .then(graphqlresult => {
            // console.log('🎉 new favoartiest added to Bezoeker')
            // console.log(graphqlresult?.data)
            refetch()
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        removeFavoArtiest({ uid: uid, artiest: props.artist.toUpperCase() })
          .then(graphqlresult => {
            // console.log('🎉 favoartiest removed from Bezoeker')
            // console.log(graphqlresult?.data)
            refetch()
          })
          .catch(error => {
            console.error(error)
          })
      }
      //   console.log("after", favorite.value);
    }

    const { onResult: onResultLineUp } = useQuery(GET_LINEUP)
    onResultLineUp(result => {
      if (result.data) {
        times.value = result.data.lineUp.reduce((acc: any, curr: any) => {
          acc[curr.naam] = curr.tijd
          return acc
        }, {})
      }
      console.log(times.value)
      console.log(times.value[currentArtist.value.artistName])
      artistList.forEach(element => {
        if (element.artistName === props.artist) {
          element.time = times.value[currentArtist.value.artistName]
        }
      })
    })

    return {
      currentArtist,
      toggleFavorite,
      favorite,
      heartColor,
      isBezoeker,
      closeModal,
    }
  },
}
</script>
