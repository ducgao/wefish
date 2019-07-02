export default class PairList {
  bind(input) {
    if (input) {
      const items = input.menu_items

      const pairList = items.map(i => {
        return {
          id: i.id,
          title: i.title,
          actionUrl: i.action_url,
          actionTitle: i.action_title,
          actionType: i.action_type_name
        }
      })
      
      return pairList
    }

    return null
  }
}