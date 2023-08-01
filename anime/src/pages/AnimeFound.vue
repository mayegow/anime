<template>
    <div v-if="loading" style="position:fixed; height:100%; width:100%; background:#2a84ee91; z-index:100000; top:0;" class="row justify-center items-center">
      <span class="loader"></span>
    </div>
    
    <h3 class="text-white text-center col-12" ><strong>{{ data.title }}</strong></h3>
    
    <div class="desktop row justify-center items-center col-12" >
      <q-card class="my-card q-mb-xl" style="width:85%; " flat bordered>
        <div class="row justify-start item-center q-mt-lg q-ml-lg">
          <q-btn
          label="Volver"
          rounded
          :to="{name: 'AnimeFind'}"
          color="purple"
          class="shadow-1 q-mb-md"
          />
          </div>
        <q-item>
          <q-item-section >
            <q-img v-if="image != null"
              class="col"
              :src="image"
              style="height:100px; width:100%;"
            />
            <q-item-label v-else>No exists image</q-item-label>
            
          </q-item-section>
  
          <q-item-section  class="row col items-start">
            <q-item-label>{{ data.title }}</q-item-label>
            <q-item-label caption>
              {{ data.synopsis }}
            </q-item-label>
            <q-item-label caption>
              
              
              
            </q-item-label>
            <q-item-label>Year {{ data.year }}</q-item-label>
            <br>
            <q-item-label>Title: {{ data.title }}</q-item-label>
            <q-item-label>Japanese Title: {{ data.title_japanese }}</q-item-label>
            <q-item-label>English title: {{ data.title_english }}</q-item-label>
            <br>
            <q-item-label>Episodes {{ data.episodes }}</q-item-label>
            
          </q-item-section>
        </q-item>
  
        <q-separator />
  
        <q-card-section >
          <q-card-section>
            <q-video v-if="trailer != null"
              :ratio="16/9"
              :src="trailer"
            />
            <q-item-label v-else >No exists trailer</q-item-label>
            <br>
            {{ data.background }}
          </q-card-section>
  
          <q-separator vertical />
  
          <q-card-section class="col-4">
            
          </q-card-section>
        </q-card-section>
      </q-card>

  </div>
        
  </template>
  
  <script>
  // import { defineComponent } from 'vue'
  import { getTransitionRawChildren, ref } from 'vue'
  import axios from 'axios'
  
  export default ({
      name: 'AnimeFound',
      data(){
        const shared = ref(null)
        const disabled = ref(null)
        const image = ref(null)
        const trailer = ref(null)
        
          return{
            confirm: ref(false),
            loading: false,
            shared,
            disabled,
            image,
            trailer,
            data: {},
            requiredRule: val => !!val || 'Este campo es obligatorio',
            
          }
      },
      methods:{
        getData(){
          var anime = localStorage.getItem('name')
          var anime_id = localStorage.getItem('id_anime')
          const path =  `https://api.jikan.moe/v4/anime?q=${anime}`
          axios.get(path)
          .then((response) => {
            this.data = response.data.data
            var anime_info = response.data.data
            for (let anime = 0 ;anime < anime_info.length ; anime++) {
              if(anime_info[anime]["mal_id"]== anime_id){
                this.data = anime_info[anime]
                this.image = anime_info[anime]['images']['jpg']['large_image_url']
                this.trailer = anime_info[anime]['trailer']['embed_url']
              }
              
            }
          })
          .catch((error) => {
            console.log(error, "=====")
          })
        },
      },
      created(){
        this.getData() 
      },
    
  })
  </script> 
  <style>
  .suspensive-dots {
      width: 230px;
      height: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
  }
  </style>
  