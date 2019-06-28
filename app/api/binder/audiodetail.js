export default class AudioDetailBinder {

  _albumName = null

  constructor(albumName) {
    this._albumName = albumName
  }

  bind(input) {
    if (input) {
      const defaultIcon = input.default_icon_url
      const items = input.audio_album_items
      const data = items.data

      const lastPage = items.last_page
      const currentPage = items.current_page

      const searchable = input.searchable

      const audioList = data.map(i => {
        return {
          icon: i.icon_url ? i.icon_url : defaultIcon,
          name: i.title,
          albumName: this._albumName,
          singerName: i.artist,
          description: i.description,
          url: i.audio_url,
          actionTitle: i.action_title,
          actionUrl: i.action_url,
          actionType: i.action_type_name
        }
      })

      return {
        paging: {
          currentPage,
          lastPage
        },
        searchable,
        audioList
      }
    }

    return null
  }
}