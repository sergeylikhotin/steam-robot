import request, { type Request } from 'request'
import SteamTotp from 'steam-totp'
import SteamUser from 'steam-user'
import SteamCommunity from 'steamcommunity'
import SteamTradeOfferManager from 'steam-tradeoffer-manager'
import { Account } from './types/Account.js'
import { Steam } from './types/Steam.js'

export class SteamRobot {
  private steam: Steam | null = null

  public readonly account: Account

  public constructor(account: Account) {
    this.account = account
  }

  public async start(): Promise<Steam> {
    const protocol = this.account.proxy?.split('://')[0] ?? ''
    const isHttp = protocol.startsWith('http')
    const isSocks = protocol.startsWith('socks')

    const client = new SteamUser({
      additionalHeaders: this.account.headers,
      httpProxy: isHttp ? this.account.proxy : null,
      socksProxy: isSocks ? this.account.proxy : null
    })

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const community = new SteamCommunity({
      request: request.defaults({
        headers: this.account.headers,
        proxy: (isHttp || isSocks) ? this.account.proxy : null,
        forever: true
      }) as unknown as Request
    } as SteamCommunity.Options)

    const manager = new SteamTradeOfferManager({
      steam: client,
      community
    })

    client.logOn({
      accountName: this.account.username,
      password: this.account.password,
      twoFactorCode: SteamTotp.generateAuthCode(this.account.sharedSecret)
    })

    await Promise.all([
      new Promise<void>((resolve) => {
        client.on('webSession', (sessionId, cookies) => {
          community.setCookies(cookies)
          manager.setCookies(cookies)
          resolve()
        })
      }),
    ])

    const steam = {
      totp: SteamTotp,
      client,
      community,
      manager,
    }

    this.steam = steam
    return steam
  }

  public stop(): void {
    if (this.steam != null) {
      this.steam.client.logOff()
      this.steam.manager.shutdown()
      this.steam = null
    }
  }
}
