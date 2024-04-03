export async function apiCall ({
  url,
  method = 'GET',
  headers = new Headers({})
}) {
  try {
    const datos = await fetch(url, {
      method,
      headers
    })
      .then(async (response) => {
        return await response.json()
      })
      .then((data) => data)
      .catch((error) => {
        console.log(error)
        return error
      })
    return datos
  } catch (error) {
    Promise.reject(error)
    return error
  }
}
