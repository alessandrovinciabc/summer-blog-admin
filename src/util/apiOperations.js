import axios from 'axios';

const apiBase =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/blog/post'
    : 'https://summer-blog-api.herokuapp.com/blog/post';

const apiAuth =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth'
    : 'https://summer-blog-api.herokuapp.com/auth';

async function getPosts() {
  return await axios.get(apiBase);
}

async function deletePost(postid, jwt) {
  return await axios.delete(`${apiBase}/${postid}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
}

async function getComments(postid) {
  return await axios.get(`${apiBase}/${postid}/comment`);
}

async function postComment(postid, data) {
  return await axios.post(`${apiBase}/${postid}/comment`, data);
}

/******************** Auth *********************/
async function login(username, password) {
  return await axios.post(`${apiAuth}/login`, { username, password });
}

async function testAuth(jwt) {
  return await axios.post(
    `${apiAuth}/test`,
    {},
    { headers: { Authorization: `Bearer ${jwt}` } }
  );
}
export { getPosts, deletePost, getComments, postComment, login, testAuth };
