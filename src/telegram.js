const tg = window.Telegram?.WebApp

export function initTelegram() {
  if (tg) {
    tg.ready()
    tg.expand()
  }
}

export function getTelegramUser() {
  return tg?.initDataUnsafe?.user ?? null
}

export function openChat(username) {
  const url = `https://t.me/${username}`
  if (tg) tg.openTelegramLink(url)
  else window.open(url, '_blank')
}