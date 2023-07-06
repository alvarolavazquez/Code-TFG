import fileDownload from 'js-file-download'
import swal from 'sweetalert'


const create = (params, credentials, checkoutDetails) => {
  return fetch('http://localhost:3000/api/orders/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({order: checkoutDetails})
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const downloadAPIproduct = async (params, credentials) => {

 await fetch('http://localhost:3000/downloadFile/'+params.orderId+'/'+params.File,{
    'method': 'GET',
    headers: {"Authorization": "bearer "+ credentials.t},
  }).then((response) => { 
    if(!response.ok && response.status == 401){
      console.log('entra en experied condition')
      response.json().then((js)=> {
        swal ({
          title: "Subscripción",
          text: 'Subscripción agotada desde el '+js.expiredAt +'. Vuelva a comprar el producto para poder disfrutarlo, gracias.',
          icon: "error",
          button: "Ok",
        });})
    }
    else{
      console.log('entra en blob '+ params.filename,)
      response.blob().then((blob) => {

        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          params.File,
        );

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      }).catch(err => console.log(err))
    }
}).catch(err => {console.log(err)})
              
};

const listByShop = (params, credentials) => {

  return fetch('http://localhost:3000/api/orders/shop/'+params.shopId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const update = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/status/' + params.shopId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const cancelProduct = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/'+params.shopId+'/cancel/'+params.productId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const processCharge = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/'+params.orderId+'/charge/'+params.userId+'/'+params.shopId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const getStatusValues = () => {
  return fetch('http://localhost:3000/api/order/status_values', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const listByUser = (params, credentials) => {
  return fetch('http://localhost:3000/api/orders/user/'+params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const read = (params, credentials) => {
  return fetch('http://localhost:3000/api/orders/' + params.orderId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  create,
  listByShop,
  update,
  cancelProduct,
  processCharge,
  getStatusValues,
  listByUser,
  read,
  downloadAPIproduct
}
