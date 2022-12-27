const childProcess = require('child_process')
const os = require('os')
const process = require('process')

function chooseBinary() {
    const platform = os.platform()
    const arch = os.arch()

    if (platform === 'linux' && arch === 'x64') {
        return `loadtest-linux-amd64`
    }

    console.error(`Unsupported platform (${platform}) and architecture (${arch})`)
    process.exit(1)
}

function main() {
    const binary = chooseBinary()
    const mainScript = `${__dirname}/${binary}`
    const spawnSyncReturns = childProcess.spawnSync(mainScript, { stdio: 'inherit' })
    const status = spawnSyncReturns.status
    if (typeof status === 'number') {
        process.exit(status)
    }
    process.exit(1)
}

if (require.main === module) {
    main()
}
