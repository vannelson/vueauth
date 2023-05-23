<template>
    <q-card class="my-card" flat style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="email" label="email" placeholder="Email" />
        <q-input v-model="password" type="password" label="Password" placeholder="Password" />
  
        <q-btn
          style="margin-top: 1em;"
          color="primary"
          class="full-width"
          label="Login"
          @click="login"
          :disable="isLoading"
        />
  
        <p v-if="error" class="text-negative">{{ error }}</p>
        <p v-if="isLoggedIn" class="text-positive">Logged in!</p>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
import { useAuthStore } from 'src/stores/auth'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const auth = useAuthStore()
const router = useRouter()

const email = ref();
const password = ref();
const isLoading = ref(false);
const error = ref();

const login = async () => {
  isLoading.value = true;
  error.value = '';

  try {
    const AuthAccess = await auth.login({ email: email.value, password: password.value });
    if (AuthAccess) {
      $q.notify({
        type: 'positive',
        message: 'Successfully logged in'
      });

      // Change route to /welcome
      router.push('/welcome');
    } else {
      $q.notify({
        type: 'negative',
        message: 'Invalid login credentials'
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;

      if (typeof errorMessage === 'string') {
        $q.notify({
          type: 'negative',
          message: errorMessage
        });
      } else if (typeof errorMessage === 'object' && errorMessage.email) {
        const emailErrorMessage = errorMessage.email[0];

        $q.notify({
          type: 'negative',
          message: emailErrorMessage
        });
      }
    } else {
      $q.notify({
        type: 'negative',
        message: 'An error occurred during login'
      });
    }
  }

  isLoading.value = false;
};
</script>
