const { dialog } = require('electron')
const path = require('path')
const platform = require('os').platform()

module.exports = function download(win, url, opts = {}) {
    console.log(win)
    win.webContents.session.once('will-download', function onDownload (e, item/*, webContents */) {
        if (opts.saveAs && platform === 'darwin') {
            let defaultFilename = item.getFilename()
            let filename = dialog.showSaveDialog(window, {
                defaultPath: path.basename(path.join(opts.savePath, defaultFilename))
            })
            if(!filename) {
                item.cancel()
            } else {
                const savePathObject = path.parse(filename)
                savePathObject.base = null
                savePathObject.ext = savePathObject.ext || path.extname(defaultFilename)
                item.setSavePath(path.format(savePathObject))
            }
        }
    })
    win.webContents.downloadURL(url)
}
