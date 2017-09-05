const { dialog } = require('electron')
const path = require('path')
const platform = require('os').platform()

module.exports = function download(win, url, opts = {}) {
    win.webContents.session.once('will-download', function onDownload (e, item) {
        if (opts.saveAs && platform === 'darwin') {
            let defaultFilename = item.getFilename()

            // show dialog custom
            let filename = dialog.showSaveDialog(win, {
                defaultPath: path.basename(defaultFilename)
            })
            if(!filename) {
                item.cancel()
            } else {
                // set extname if not exist
                const savePathObject = path.parse(filename)
                savePathObject.base = null
                savePathObject.ext = savePathObject.ext || path.extname(defaultFilename)
                item.setSavePath(path.format(savePathObject))
            }
        }
    })
    win.webContents.downloadURL(url)
}