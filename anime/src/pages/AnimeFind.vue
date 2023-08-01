<template>
    <div v-if="loading" style="position:fixed; height:100%; width:100%; background:#2a84ee91; z-index:100000; top:0;" class="row justify-center items-center">
      <span class="loader"></span>
    </div>
    <h3 class="text-white text-center col-12" ><strong>Busca Anime</strong></h3>
    <div class="desktop row justify-center items-center col-12" >
      <q-banner v-if="disabled" inline-actions class="text-white bg-red">
        {{ errorMessage }}
        <template v-slot:action>
          <q-btn flat color="white" label="Cerrar" @click="disabled = false"/>
        </template>
      </q-banner>
      <q-card class="my-card q-mb-xl"   style="width:85%; ">
              
        <q-card-section>
          <q-card-section class="col-4">
            <q-form
                class="q-pa-md example-col-gutter-mixed "
                >
                    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg" >
                        <div class="col-12 col-md-12">
                          <q-input
                            outlined
                            v-model="shared"
                            :rules="[requiredRule]"
                            label="Nombre"
                            error-message="El nombre del anime es obligatorio"
                            ></q-input>
                        </div>
                    </div>
                    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg ">
                        <div class="col-12 col-sm-6 col-md-6 col-lg-6 row items-center justify-center ">
                            
                        </div>
                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="row q-flex-sm-center justify-lg-end justify-md-start justify-xs-center justify-sm-center justify-center q-mt-xl q-pa-md q-gutter-x-md">
                                <q-btn :disable="!isFormValid" label="Buscar" @click="getData()" rounded color="primary" class="shadow-1 q-mb-md" />
                                
                            </div>
                        </div>
                    </div>
                    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg q-mt-lg">
                        <div class="col-12 col-sm-12 col-md-12 col-lg-12 row items-center justify-center ">
                          <div class="row q-gutter-sm q-col-gutter-y-lg justify-center">
                            <q-card v-for="(anime, index) in data" :key="index" class="my-card shadow-box shadow-8 q-mb-xl col-12 col-sm-4 col-md-4 col-lg-3" >
                              <q-img :src="anime.images['jpg']['image_url']" style="max-width: 100%; height:450px;">
                                <div class="absolute-bottom text-subtitle2 text-center">
                                  {{ anime.title }}
                                </div>
                              </q-img>
                                <q-card-section >
                                  <pre style="white-space: pre-line" class="suspensive-dots">{{ anime.background }}</pre>
                                </q-card-section>
                                <q-card-actions class="row justify-end">
                                  <q-btn
                                  label="ver mas"
                                  @click="updateData(anime.mal_id)"
                                  rounded
                                  color="purple"
                                  class="shadow-1 q-mb-md"
                                  :to="{ name: 'AnimeFound' }"
                                />
                                </q-card-actions>
                                
                            </q-card>
                        </div>
                        </div>
                    </div>
                </q-form>
          </q-card-section>
        </q-card-section>
        
      </q-card>      
  </div>
        
  </template>
  
  <script>
  import { ref } from 'vue'
  import axios from 'axios'
  
  export default ({
      name: 'AnimeFind',
      data(){
        const shared = ref(null)
        const disabled = ref(null)
        
          return{
            loading: false,
            shared,
            disabled,
            data: {},
            requiredRule: val => !!val || 'Este campo es obligatorio',
            
          }
      },
      methods:{
        getData(){
          console.log('dentro')
          const path =  `https://api.jikan.moe/v4/anime?q=${this.shared}`
          axios.get(path)
          .then((response) => {
            this.data = response.data.data
            console.log(this.data)
          })
          .catch((error) => {
            var id_anime = localStorage.getItem("id")
            
            console.log(error, "=====")
          })
        },
        updateData(id){
          localStorage.setItem('name', this.shared)
          localStorage.setItem('id_anime', id)
        }
      },
      computed:{
        isFormValid() {
          return (
            this.requiredRule(this.shared) === true 
          );
        }

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
  