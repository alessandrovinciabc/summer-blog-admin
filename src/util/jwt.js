function save(jwt) {
  localStorage.setItem('jwt', jwt);
}

function get(jwt) {
  return localStorage.getItem('jwt');
}

function remove() {
  return localStorage.removeItem('jwt');
}

let jwtModule = { save, get, remove };

export default jwtModule;
