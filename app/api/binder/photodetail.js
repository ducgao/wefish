export default class PhotoDetailBinder {
  bind(input) {
    if (input) {
      const items = input.photo_album_items
      const data = items.data

      const currentPage = items.current_page
      const lastPage = items.last_page
      const total = items.total

      const photos = data.map(i => {
        return {
          id: i.id,
          url: i.photo_url
        }
      })
      

      return {
        paging: {
          currentPage,
          lastPage,
          total
        },
        photos
      }
    }

    return null
  }
}