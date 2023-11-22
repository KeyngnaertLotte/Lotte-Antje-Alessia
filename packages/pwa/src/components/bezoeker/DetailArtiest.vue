<template>
    <div class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
        <div class="relative bg-white w-9/10 h-3/4 rounded-lg flex flex-col  items-center p-6">
            <button @click="closeModal" class="absolute top-[-1rem] right-[-0.5rem] flex justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"><X class="h-10 w-10 stroke-white"/> </button>
            <button @click="toggleFavorite" class="font-body font-bold text-3xl flex flex-row justify-center items-center gap-2">{{ currentArtist.artistName }} <p v-if="isBezoeker" class="h-12 w-12 flex justify-center items-center"><Heart :class="heartColor" /></p></button>
            <p class="font-body text-xl">{{ currentArtist.time }}</p>
            <img :src=currentArtist.imgLink alt="aaaaaaaaaaaaaaa" class="my-6">
            <p class="font-pop text-lg text-justify">{{ currentArtist.info }}</p>
            <br>
            <p class="font-pop text-lg text-justify"> {{ currentArtist.top }} </p>
        </div>
    </div>
</template>

<script lang="ts" >
    import { computed, onMounted, ref, defineEmits } from 'vue';
    import { Heart, X } from 'lucide-vue-next';
    import { useMutation } from '@vue/apollo-composable'
    import { provideApolloClient, useQuery } from '@vue/apollo-composable'
    import { GET_FAVOARTISTS_BY_ID } from '@/graphql/bezoeker.query'
    import { ADD_FAVOARTIEST, REMOVE_FAVOARTIEST } from '@/graphql/bezoeker.mutation';
    import useCustomUser from '@/composables/useCustomUser'
    const { customUser } = useCustomUser();
    const uid = customUser.value?.uid;
    const heartColor = ref("w-10 h-10 fill-none")
    const favorite = ref(false);

    const artistList = [
       {
        artistName: 'Tom Mish',
        time: '20:15 - 21:30',
        imgLink: 'https://dynamicmedia.livenationinternational.com/Media/d/d/q/5144376b-4ee0-4dbf-abf5-47f9f299c333.jpeg',
        info: 'Thomas Abraham Misch is een Engelse muzikant en producer. Hij begon in 2012 met het uitbrengen van muziek op SoundCloud en bracht in 2018 zijn debuutstudioalbum Geography uit.',
        top: "Meest gekende liedjes: It Runs Through Me, Happy Music, Feel Like Makin' Love, Movie en Keep It Rising"
        },
        {
        artistName: 'Brihang',
        time: '22:00 - 23:15',
        imgLink: 'https://img.demorgen.be/a249145fe8c71ed30203c48b50aa56baf2dbadd1/brihang-ik-schrijf-het-liefst-in-de-taal-die-ik-spreek-tegen-mijn-vrouw',
        info: `Brihang, pseudoniem van Boudy Verleye, is een Belgische rapper. In het West-Vlaams klonk dat Franse woord voor struikrover als 'brihang'. 'Het betekent zoveel als vriendelijk crapuul'`,
        top: "Meest gekende liedjes: Steentje, Tussenin, Telefoontje, Rommel en Alles Is Gezegd"
        },
        {
        artistName: 'BeRightBack',
        time: '23:45 - 01:00',
        imgLink: 'https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif',
        info: "Een drie-koppige band die jullie laat swingen op uit de hand gelopen jamsessies en catchy covers!🕺🤪",
        top: "We mixen verschillende stijlen zoals blues, jazz, rock, country en pop om een unieke sound te creëren die jullie helemaal hyped maakt! 🎸"
        },
        {
        artistName: 'Bohnes',
        time: '20:00 - 21:30',
        imgLink: 'https://i.pinimg.com/originals/b6/c0/40/b6c040aa27f8b71db3b840115f87ae3f.jpg',
        info: 'Alexander Michael DeLeon, ook wel bekend als Bohnes, is een Amerikaanse zanger, vooral bekend als leadzanger van de rockband The Cab.',
        top: "De meest gekende liedjes: Middle Finger, Raging on a Sunday, You've Created a Monster, Vicious en Zombie Love."
        },
        {
        artistName: 'Aston',
        time: '20:15 - 21:30',
        imgLink: 'https://i.ytimg.com/vi/U0v0n3b0bEY/maxresdefault.jpg',
        info: "ASTON heeft de soundtrack van een grote film geschreven en gespeeld, haar liedjes in een internationale commercial voor BMW laten plaatsen, in de tv-serie 'Insatiable' en 'Lucifer' opgenomen en zich aangesloten bij de mondiale NBA franchise voor videogames.",
        top: "Meest gekende liedjes: Mama Didn't Raise No, Boy Problems, For The girls, Middle Fingers en Often"
        },
        {
        artistName: 'NF',
        time: '23:00 - 00:30',
        imgLink: 'https://www.rollingstone.com/wp-content/uploads/2019/08/Main-Press-Image-NF-John-Taylor-Sweet-.jpg?w=1581&h=1054&crop=1',
        info: 'Nathan John Feuerstein, bekend onder zijn artiestennaam NF, is een Amerikaanse rapper. Hij heeft zes studioalbums uitgebracht: Mansion, Therapy Session, Perception, The Search, CLOUDS en HOPE.',
        top: "Meest gekende liedjes: Let You Down, The Search, Hope, Happy en Lie"
        },
        {
        artistName: 'TheFatRat',
        time: '20:00 - 21:00',
        imgLink: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/1/30/vlvkjrvv6blsypp3njkb/dj-the-fat-rat-bilder',
        info: 'Christian Friedrich Johannes Büttner, professioneel bekend als TheFatRat, is een Duitse DJ, producer en muzikant. Zijn genre wordt vaak omschreven als "glitch-hop". ',
        top: "Meest gekende liedjes: Fly Away, Rise Up, Stronger, Unity en Monody"
        },
        {
        artistName: 'Neffex',
        time: '21:15 - 22:15',
        imgLink: 'https://imageio.forbes.com/specials-images/imageserve/5da6105ddb402600062023c0/NEFFEX--Left-to-right--Bryce-Savage-and-Cameron-Wales--Photo-by-Jonathan-Weiner-/960x0.jpg?format=jpg&width=960',
        info: 'Neffex is een Amerikaans muziekproject van Bryce Savage, waar oorspronkelijk ook Cameron Wales deel van uitmaakte. Ze produceerden remixen en originele nummers die werden gekenmerkt door een mix van elektronische en rapgenres.',
        top: "Meest gekende liedjes: Fight Back, Rumors, Grateful, Best of Me en Go!"
        },
        {
        artistName: 'BoyWithUke',
        time: '22:30 - 23:30',
        imgLink: 'https://dynamicmedia.livenationinternational.com/o/d/o/0aaaedde-17fa-41c7-abe0-d5e58cd9069b.png',
        info: 'BoyWithUke is een Zuid-Koreaanse-Amerikaanse zanger, muzikant en internetpersoonlijkheid die zijn uiterlijk verbergt. Hij werd populair op het online platform TikTok met zijn singles "Toxic" en "Understand", en is een van de meest populaire anonieme artiesten op het platform geworden.',
        top: "Meest gekende liedjes: Toxic, IDGAF, Understand, Sick of U en Migraine"
        },
        {
        artistName: 'Imagine Dragons',
        time: '23:45 - 00:45',
        imgLink: 'https://www.coca-cola.com/content/dam/onexp/global/central/offerings/coke-studio/artists/2_Imagine_Dragons_by_Eric_Ray_Davidson_GREEN_04_16-9.jpg',
        info: 'Imagine Dragons is een Amerikaanse poprockband uit Las Vegas, gevormd in 2008. De band bestaat uit Dan Reynolds, Wayne Sermon, Daniel Platzman en Ben McKee. De manager van de band is Mac Reynolds, de oudere broer van zanger Dan Reynolds. ',
        top: "Meest gekende liedjes: Bones, Believer, Demons, Thunder en Enemy"
        },

        
    ]

    export default {
        
    props: {
        artist: {
        type: String,
        required: true
        },
        modalState: {
            type: Boolean,
            required: true
        },
        isBezoeker: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close-modal'],
    components: {
        Heart,
        X
    },
       
  setup(props, { emit }) {
    
    function closeModal() {
        emit('close-modal')
    }
    
    onMounted(() => {
        console.log("mounted")
    });
    
    const { mutate: addFavoArtiest } = useMutation(ADD_FAVOARTIEST)
    const { mutate: removeFavoArtiest } = useMutation(REMOVE_FAVOARTIEST)
    const isBezoeker = ref(props.isBezoeker);

    const currentArtist = ref();


    artistList.forEach((element) => {
      if (element.artistName === props.artist) {
        currentArtist.value = element;
      }
    });

    

    // Assuming the GraphQL query result is stored in the 'result' variable
    const { error, result, loading, refetch, onResult } = useQuery(GET_FAVOARTISTS_BY_ID, { uid });

    onResult((result) => {
    if (result.data) {
        for (const artiest of result.data.bezoekersFavorite) {
            console.log(artiest.artiest)
            const doesIt = artiest.artiest.includes(currentArtist.value.artistName.toUpperCase())
            console.log(doesIt)
          if (doesIt) heartColor.value = "w-10 h-10 fill-custom-darkGreen stroke-custom-darkGreen"
          else heartColor.value = "w-10 h-10 fill-none"
        }
    }
  });

  const toggleFavorite = () => {
    //   console.log("before", favorite.value);
      favorite.value = !favorite.value;
    //   console.log(props.artist)
    //   console.log(uid)
      if (favorite.value) {
        addFavoArtiest({ uid: uid, artiest: props.artist.toUpperCase() })
        .then((graphqlresult) => {
            console.log('🎉 new favoartiest added to Bezoeker');
            console.log(graphqlresult?.data); // Access the returned data
            refetch()
        })
        .catch((error) => {
            console.error(error)
        })
        }
        else {
            removeFavoArtiest({ uid: uid, artiest: props.artist.toUpperCase() })
            .then((graphqlresult) => {
                console.log('🎉 favoartiest removed from Bezoeker');
                console.log(graphqlresult?.data); // Access the returned data
                refetch()
            })
            .catch((error) => {
                console.error(error)
            })
        }
    //   console.log("after", favorite.value);
    };


    
    return {
      currentArtist,
      toggleFavorite,
      favorite,
      heartColor,
      isBezoeker,
        closeModal
    };
  }
};


</script>