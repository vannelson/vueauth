import { loginUser } from 'src/services/AuthUser';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: sessionStorage.getItem('token') || null,
      isLoading: false,
      error: null,
    };
  },
  actions: {
    async login(formData) {
      this.isLoading = true;
      this.error = null;
      try {
        const { token, usertype} = await loginUser(formData);
        console.log(token)
        sessionStorage.setItem('token', token);
       sessionStorage.setItem('usertype', usertype);
       console.log(usertype)
        this.token = token;
        return token
       
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    isLoggedIn() {
      return !!this.token;
    },
  },
});
