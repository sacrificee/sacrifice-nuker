const rpc = require('discord-rpc')
const rpcClient = new rpc.Client({
    transport: 'ipc'
})

class RPC {
    run() {
        rpcClient.on('ready', () => {
            rpcClient.request('SET_ACTIVITY', {
                pid: process.pid,
                activity: {
                    details: "sacrifice",
                    state: 'https://github.com/sacrificee',
                    assets: {
                        large_image: "https://cdn.discordapp.com/attachments/1082786706488570031/1088262216555446314/5c5158740ddc1b9d899e4225b5663566.jpg",
                        large_text: "@sacrifice"
                    },
                    buttons: [{
                        label: "Download",
                        url: "https://github.com/sacrificee"
                    }]
                }
            })
        })

        rpcClient.login({
            clientId: ''
        }).catch(() => {}).then(() => console.log('RPC connected!'))
    }
}

module.exports = RPC
