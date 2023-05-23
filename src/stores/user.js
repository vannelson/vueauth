// store/auth.js
import { createUser, getUserDetails, logoutUser } from 'src/services/AuthUser';
import { defineStore } from 'pinia';

export const useUserstore = defineStore('user', {
  state: () => ({
  }),
  actions: {
    async register(formData,token) {
      try {
        const create =  await createUser(formData,token);
        return create
      } catch (error) {
      } finally {
      }
    },
    async getlist(token){
      try {
        const list =  await getUserDetails(token);
        return list
      } catch (error) {
      }
    },
    async logout(token) {
      try {
        await logoutUser(token);
        // Perform any necessary cleanup or state changes after logout
      } catch (error) {
        // Handle error
      }
    }
  },
});
