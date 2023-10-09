import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
import SteamTradeOfferManager from 'steam-tradeoffer-manager'

export interface Steam {
  totp: typeof SteamTotp
  client: SteamUser
  community: SteamCommunity
  manager: SteamTradeOfferManager
}
