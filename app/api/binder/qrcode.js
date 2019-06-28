export default class QRCode {

  bind(input) {
    if (input) {
      return {
        actionTitle: input.action_title,
        actionUrl: input.action_url,
        actionType: input.action_type_name
      }
    }

    return null
  }
}