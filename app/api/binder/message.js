export default class MessageBinder {
  bind(input) {
    if (input) {
      const items = input.messages
      const data = items.data
      
      const banner = input.banner
      const responseBanner = banner ? {
        actionTitle: banner.action_title,
        image: banner.url,
        actionUrl: banner.action_url,
        actionType: banner.action_type_name
      } : null

      const lastPage = items.last_page
      const currentPage = items.current_page

      const defaultStyle = input.default_style
      const responseDefaultStyle = {
        primaryIcon: defaultStyle.primary_icon_url,
        secondaryIcon: defaultStyle.secondary_icon_url,
        readMoreIcon: defaultStyle.read_more_icon_url,
        listItemBackground: defaultStyle.list_background_color,
        background: defaultStyle.container_background_color,
        separator: defaultStyle.list_separator_color,
        border: defaultStyle.container_border_color,
        badgeBackground: defaultStyle.badge_background_color,
        badgeText: defaultStyle.badge_text_color,
        dateText: defaultStyle.date_text_color,
        titleText: defaultStyle.title_text_color,
        contextText: defaultStyle.content_text_color,
        summaryText: defaultStyle.summary_text_color
      }

      const searchable = input.searchable

      const messages = data.map(i => {
        var content = null
        if (i.content_type == "content") {
          content = i.content
        } else if (i.content_type == "summary") {
          content = i.summary
        }

        const bannerUrl = i.image_url ? i.image_url : null
        const style = i.custom_style == null ? responseDefaultStyle : {
          primaryIcon: i.custom_style.primary_icon_url,
          secondaryIcon: i.custom_style.secondary_icon_url,
          readMoreIcon: i.custom_style.read_more_icon_url,
          listItemBackground: i.custom_style.list_background_color,
          background: i.custom_style.container_background_color,
          separator: i.custom_style.list_separator_color,
          border: i.custom_style.container_border_color,
          badgeBackground: i.custom_style.badge_background_color,
          badgeText: i.custom_style.badge_text_color,
          dateText: i.custom_style.date_text_color,
          titleText: i.custom_style.title_text_color,
          contentText: i.custom_style.content_text_color,
          summaryText: i.custom_style.summary_text_color
        } 
        
        return {
          type: i.content_type,
          banner: bannerUrl,
          time: i.date,
          title: i.title,
          badge: i.badge,
          actionUrl: i.action_url,
          actionTitle: i.action_title,
          actionType: i.action_type_name,
          content,
          style
        }
      })
      
      return {
        banner: responseBanner,
        paging: {
          currentPage,
          lastPage
        },
        searchable,
        messages
      }
    }

    return null
  }
}