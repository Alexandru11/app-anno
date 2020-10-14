import jwtDecode from 'jwt-decode';

export default {
  beforeCreate: () => {
    const token = window.localStorage.getItem('jwt') || '';
    if (token !== '') {
      const decoded = jwtDecode(token);
      console.log(decoded);
    } else {
      throw new TypeError('No JWT token stored');
    }
  },
  methods: {
    decodeToken(token) {
      if (token !== '') {
        const decoded = jwtDecode(token);
        console.log(decoded);
      } else {
        throw new TypeError('No JWT token stored');
      }
    },
  },
};
