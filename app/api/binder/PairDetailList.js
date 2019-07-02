export default class PairDetailList {
  bind(input) {
    if (input) {
      const items = input.photo_album_items

      const list = items.map(i => {
        return {
          id: i.id,
          title: i.photo_name,
          imageUrl: i.photo_url,
          buttonNo: i.button_no,
          buttonNoUrl: i.button_no_url,
          buttonBuyOnly: i.button_buy_only,
          buttonBuyOnlyUrl: i.button_buy_only_url,
          buttonSellOnly: i.button_sell_only,
          buttonSellOnlyUrl: i.button_sell_only_url,
          buttonAllIn: i.button_all_in,
          buttonALlInUrl: i.button_all_in_url,
        }
      })
      
      return list
    }

    return null
  }
}