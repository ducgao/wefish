export default class CategoryBinder {
  bind(input) {
    if (input) {
      const items = input.menu_items
      const data = items.data
      const defaultIcon = input.default_icon_url
      const lastPage = items.last_page
      const currentPage = items.current_page

      const bellUrl = input.bell_url
      const mantraUrl = input.hot_album_url

      const banner = input.banner
      const responseBanner = banner ? {
        actionTitle: banner.action_title,
        image: banner.url,
        actionUrl: banner.action_url,
        actionType: banner.action_type_name
      } : null

      const searchable = input.searchable

      const categories = data.map(i => {
        return {
          icon: i.primary_icon_url ? i.primary_icon_url : defaultIcon,
          title: i.title,
          description: i.description,
          actionTitle: i.action_title,
          actionType: i.action_type_name,
          actionUrl: i.action_url,
          slug: i.slug,
          badgeUrl: i.label_url
        }
      })
      
      return {
        banner: responseBanner,
        paging: {
          currentPage,
          lastPage
        },
        searchable,
        categories,
        externalData: {
          bellUrl,
          mantraUrl
        }
      }
    }

    return null
  }
}