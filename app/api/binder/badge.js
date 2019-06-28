export default class BadgeBinder {
  bind(input) {
    if (input) {
      const data = input.data
      if (data) {
        return data
      }
      
      return null
    }

    return null
  }
}