exports.create = user => {
  const options = { 
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
       body: JSON.stringify(user)
  
  }  
  return fetch("http://localhost:3000/api/users/", options)
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.list = () => {
  return fetch("http://localhost:3000/api/users/", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.read = (params, credentials) => {
  return fetch("http://localhost:3000/api/users/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

exports.update = (params, credentials, user) => {
  return fetch("http://localhost:3000/api/users/" + params.userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

exports.remove = (params, credentials) => {
  return fetch("http://localhost:3000/api/users/" + params.userId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

