const wordpressApiUrl = process.env.WORDPRESS_API_URL || "";
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME;
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ":" + passwordWordpress).toString('base64'));

export const getWordpressUser = async (username: string, password: string, rememberMe: boolean) => {
  try {
    const url = wordpressApiUrl + "/wp-json/jwt-auth/v1/token";
    const requestInit = {
      headers: myHeaders,
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password,
        "rememberMe": rememberMe
      })
    } as RequestInit;
    const wordpressUserResponse = await fetch(url, requestInit);
    if (wordpressUserResponse.ok) {
      const wordpressUser = await wordpressUserResponse.json();
      const user = {
        token: wordpressUser.token,
        name: wordpressUser.user_display_name,
        email: wordpressUser.user_email,
      }
      return user
    }
    console.error("No user found:", wordpressUserResponse.statusText);

  } catch (error) {
    console.error("Error in login:", error);
  }
}
