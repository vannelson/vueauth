<template>
    <div class="column items-center">
      <br><br>
      <div class="q-pa-md" style="width: 700px;">
        <div class="row">
          <div class="col">
            <q-btn color="orange" icon="logout" size="sm" label="Logout" @click="logout"/>
          </div>
          <div class="col">
            <q-btn color="positive" icon="add" label="Add User " size="sm"   @click="Update = true" />
          </div>
        </div>
        <div v-if="usertype === 'admin'">
          <q-table 
          flat bordered
          :rows="rows"
          :columns="columns"
           row-key="name"
         >

        <template v-slot:header="props">
        <q-tr :props="props" class="bg-primary text-white">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>


      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>{{ props.row.name }}</q-td>
          <q-td>{{ props.row.email }}</q-td>
          <q-td>{{ props.row.usertype }}</q-td>
        </q-tr>
      </template>


        </q-table>
        </div >
   
        <q-btn  v-else color="red" style="margin-top: 2em" class="full-width" icon="notifications_active" label="Subscribe" />
       
      </div>
    </div>


    <q-dialog v-model="Update">
      <register-auth :UpdateInfo="[]" :action="'insert'"/>
    </q-dialog>

  </template>
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useUserstore } from 'src/stores/user'
 import { useRouter } from 'vue-router';
 import RegisterAuth from 'src/components/auth/RegisterAuth.vue';

 const user = useUserstore()

 const router = useRouter()
 const columns = ref([
   {
    field: 'name',
     name: 'name',
     required: true,
     label: 'Name',
     align: 'left',
     sortable: true
   },
   { field: 'email', name: 'email', align: 'center', label: 'Email', field: 'calories', sortable: true },
   { field: 'usertype', name: 'usertype', label: 'Usertype', field: 'fat', sortable: true },
 ]);
 
 const rows = ref([])
 const toadmin = ref(false)
 const Update  = ref(false)
 const usertype = ref('')
 onMounted(async () => {
  await fetchData()
 });

async function fetchData() {
  const token = sessionStorage.getItem('token')
  usertype.value = sessionStorage.getItem('usertype')
  console.log(usertype.value)
   const response = await user.getlist(token);

   if(response){
     
   }else{
    // router.push('/login');
   }

   const mappedData = await response.data.map(item => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        usertype: item.usertype
      };
    });

   rows.value = mappedData

}

async function toadminaction() {
  toadmin.value = true
}

async function logout() {
  const token = sessionStorage.getItem('token');
 
  await user.logout(token);
  
  // Perform any necessary cleanup or state changes after logout
  router.push('/login');
}


 </script>
