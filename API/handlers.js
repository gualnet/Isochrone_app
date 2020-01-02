const responseHandler = (response) => {
  if (response.status === 200) {
    console.log('***********************')
    console.log('* RESPONSE STATUS 200 *')
    console.log('***********************')
    console.log('DATA', response.data);
  } else if (response.status !== 200) {
    console.log(`!!! ${response.status} !!!`)
    throw(Error(response.error));
  }
};

export default responseHandler;