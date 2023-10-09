# steam-robot

Steam bots creating library.

## Install

```bash
npm install node-steam-robot
```

## Usage

```javascript
import SteamRobot from 'steam-robot'

// Account object for creating a bot
const account = {
  // Required properties
  username: 'username',
  password: 'password',
  sharedSecret: 'sharedSecret',
  // Optional properties
  identitySecret: 'identitySecret',
  options: {
    key: 'You can specify additional options'
  },
  headers: {
    key: 'You can specify additional headers'
  },
  proxy: null // Format protocol://username:password@host:port
}

const bot = new SteamRobot(account)

// You can work with the Steam object directly without using use()
const steam = await bot.start()

// The steam object contains:
// - totp (steam-totp)
// - client (steam-user)
// - community (steamcommunity)
// - manager (steam-tradeoffer-manager)

// Exit Steam
bot.stop()
```

## See also

| Module                                                                                   | Description                                                             | Author                              |
|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|-------------------------------------|
| [steam-totp](https://github.com/DoctorMcKay/node-steam-totp)                             | Lightweight module to generate Steam-style TOTP auth codes              | DoctorMcKay                         |
| [steam-user](https://github.com/DoctorMcKay/node-steam-user)                             | Allows interaction with the Steam network via the Steam client protocol | DoctorMcKay                         |
| [steamcommunity](https://github.com/DoctorMcKay/node-steamcommunity)                     | Interact with various interfaces on Steam Community from Node.js        | DoctorMcKay                         |
| [steam-tradeoffer-manager](https://github.com/DoctorMcKay/node-steam-tradeoffer-manager) | Simple and sane Steam trade offer management                            | DoctorMcKay                         |
| [steam-robot](https://github.com/sergeylikhotin/steam-robot) (YOU HERE)               | Steam bots creating based on middlewares                                | Vladislav Puzyrev & Sergey Likhotin |
