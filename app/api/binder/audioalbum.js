export default class AudioAlbumBinder {
  bind(input) {
    if (input) {
      const items = input.audio_albums
      const data = items.data

      const lastPage = items.last_page
      const currentPage = items.current_page

      const banner = input.banner
      const responseBanner = banner ? {
        actionTitle: banner.action_title,
        image: banner.url,
        actionUrl: banner.action_url,
        actionType: banner.action_type_name
      } : null

      const searchable = input.searchable

      const album = data.map(i => {
        return {
          id: i.id,
          title: i.title,
          thumbnail: i.cover_url,
          actionUrl: i.action_url,
          actionTitle: i.action_title,
          actionType: i.action_type_name
        }
      })
      
      return {
        paging: {
          currentPage,
          lastPage
        },
        banner: responseBanner,
        searchable,
        album
      }
    }

    return null
  }
}