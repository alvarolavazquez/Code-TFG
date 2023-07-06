
const signin = user => {
  return fetch("http://localhost:3000/api/auth/signin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"http://localhost:3000",
      "Access-Control-Allow-Methods"	: "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "referrerPolicy" : "no-referrer-when-downgrade"
    },
    credentials: "include",
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
      return err.json();
    }
      );
};

const signout = () => {
  return fetch("http://localhost:3000/auth/signout/", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export { signin, signout }