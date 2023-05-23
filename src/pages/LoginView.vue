<template>
    <div class="column items-center" style="height: 150px">
      <br><br>
      <div class="col">
        <q-card>
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
          </q-tabs>
  
          <q-separator />
  
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
              <login-auth />
            </q-tab-panel>
  
            <q-tab-panel name="register">
             <register-auth :UpdateInfo="[]" :action="'insert'"/>
            </q-tab-panel>
  
  
          </q-tab-panels>
        </q-card>
      </div>
  
    </div>
  
  </template>
  
  <script setup>
  import LoginAuth from 'src/components/auth/LoginAuth.vue';
  import RegisterAuth from 'src/components/auth/RegisterAuth.vue';
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  
  const tab = ref('login')
  const $q = useQuasar()
  
  </script>
  