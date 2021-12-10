//https://stackoverflow.com/questions/54036341/how-to-get-user-information-from-jwt-cookie-in-nextjs-reactjs
function ParseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
export default ParseJwt;
