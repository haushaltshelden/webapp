import { defineStore } from 'pinia';
import apolloClient from '../plugins/apollo';
import { loginUser, createUser, leaveHousehold } from '@/apollo/mutations';
import { getMyHousehold, myUser, fetchPoints } from '@/apollo/queries';
import { useErrorsStore } from './useErrors';

export const useUserStore = defineStore('users', {
  state: () => ({
    loggedIn: localStorage.getItem('loggedIn') ?? false,
    user: JSON.parse(localStorage.getItem('user')),
    registrationSuccess: false,
    points: 0
  }),

  actions: {
    async leaveHousehold() {
      const { data } = await apolloClient.mutate({
        mutation: leaveHousehold
      })

      if (data.leaveHousehold.success) this.user.household = null;
    },

    async getMyHousehold() {
      const { data } = await apolloClient.query({ query: getMyHousehold })
      if (data.getMyHousehold) this.user.household = data.getMyHousehold._id
    },

    async login(credentials) {
      const login = (
        await apolloClient.mutate({
          mutation: loginUser,
          variables: { ...credentials },
        })
      ).data;

      if (!login) return;

      if (!login.loginUser.success) {
        const { throwError } = useErrorsStore();
        throwError(login.loginUser)

        return;
      }

      localStorage.setItem('access-token', login.loginUser.msg);

      await apolloClient.resetStore();

      this.registrationSuccess = false;
      this.fetchUser();
    },

    async fetchUser() {
      const user = (
        await apolloClient.query({
          query: myUser,
        })
      ).data;

      this.loggedIn = true;
      this.user = user.myUser;
      localStorage.setItem('loggedIn', this.loggedIn);
      localStorage.setItem('user', JSON.stringify(this.user));
    },

    async fetchPoints() {
      const { data } = await apolloClient.query({
        query: fetchPoints,
        fetchPolicy: 'no-cache',
      });

      this.points = data.myUser.points;
    },

    async logout() {
      localStorage.removeItem('access-token');
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');

      this.loggedIn = false;
      this.user = null;
      this.registrationSuccess = false;
      this.points = null;

      await apolloClient.resetStore();
    },

    async createUser(credentials) {
      const register = (
        await apolloClient.mutate({
          mutation: createUser,
          variables: { ...credentials },
        })
      ).data;

      if (!register.createUser.success) {
        const { throwError } = useErrorsStore();
        throwError(register.createUser)
      } else {
        this.registrationSuccess = true;
      }
    },
  },
});
