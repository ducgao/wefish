export default class AuthBinder {
  bind(input) {
    if (input) {
      const accessToken = input.access_token

      if (accessToken) {
        return {
          accessToken
        }
      }
      
      return null
    }

    return null
  }
}