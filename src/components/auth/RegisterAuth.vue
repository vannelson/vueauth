<template>
    <q-card class="my-card" flat style="width: 400px;">
        <q-card-section>
            <div class="text-h6">Registration </div>
        </q-card-section>
        <q-card-section class="q-pt-none">

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">



                <q-input label="Email" v-model="email" filled type="email" hint="Email"
                    :rules="[val => val && val.length > 0 || 'Please Provide Email']" />

                <q-input filled v-model="phone" label="Phone" mask="(###) ### - ####" hint="Mask: (###) ### - ####"
                    :rules="[val => val && val.length > 0 || 'Please Provide Phone No']" />


                <q-select  v-model="usertype" filled :options="options" label="User Type" />



                <q-input filled v-model="username" label="Username" hint="Name and surname" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please type something']" />

                <q-input v-model="password" filled type="password" hint="Password" />

                <q-input v-model="confirmpassword" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
                    <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="isPwd = !isPwd" />
                    </template>
                </q-input>

   
                <div>
                    <q-btn v-if="props.action==='insert'" label="Submit" :disable="isLoading" type="submit" color="primary" />
                    <q-btn v-if="props.action!='insert'" label="Save Changes" :disable="isLoading"  color="blue" />
                </div>
            </q-form>

        </q-card-section>
    </q-card>
</template>
  
<script setup>
// import { useQuasar } from 'quasar'
import { ref , onMounted} from 'vue'
import { useUserstore } from 'src/stores/user'

import { useQuasar } from 'quasar'
import { updateUser } from 'src/services/AuthUser';
const $q = useQuasar()
const user = useUserstore()

// const tab = ref('login')
// const $q = useQuasar()

const email = ref(null)
const phone = ref(null)
const username = ref(false)

const password = ref('')
const confirmpassword = ref('')
const isPwd = ref(true)
const usertype = ref('visitor')

const options = ref([
        'visitor', 'admin'
])

const isLoading = ref(false);


const props = defineProps({
    UpdateInfo: {
      type: Array,
      required: false
    },
    action: {
      type: String,
      required: false
    }
 });

async function onSubmit() {

    isLoading.value = true
    try {
        const token = sessionStorage.getItem('token')
        const formdata = {
            "email": email.value,
            "phoneno": phone.value,
            "username": username.value,
            "password": password.value,
            "name": username.value,
            "usertype": usertype.value
        }

        const create = await user.register(formdata, token)

        if (create) {
            $q.notify({
                type: 'positive',
                message: 'Successfully Save  in'
            });

             email.value = ''
             phone.value = ''
             username.value = ''
             password.value = ''
             confirmpassword.value = ''

        } else {
            $q.notify({
                type: 'negative',
                message: 'Invalid Save credentials'
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
                message: 'An error occurred during Save'
            });
        }
    }

    isLoading.value = false;
    updateUser.va


}

onMounted(async () => {
  if(props.UpdateInfo.length > 0){
     email.value = props.UpdateInfo.email
     phone = props.UpdateInfo.phone
     username = props.UpdateInfo.username
     password = props.UpdateInfo.password
     usertype = props.UpdateInfo.usertype
  }
});


function onReset() {
    name.value = null
    age.value = null
    accept.value = false
}
</script>
  