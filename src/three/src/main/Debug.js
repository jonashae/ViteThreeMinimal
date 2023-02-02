import GUI from 'lil-gui'

export default class Debug {
  constructor() {
    this.ui = new GUI()

    this.quickPreset = null

    this.ui.add(this, 'quicksave').name('Quick Save')
    this.ui.add(this, 'quickload').name('Quick Load')

    const exportSettings = this.ui.addFolder('Export Settings')

    exportSettings.add(this, 'export').name('Export')
    exportSettings.add(this, 'import').name('Import')
    exportSettings.close()
  }

  quicksave() {
    this.quickPreset = this.ui.save()
  }

  import() {
    const importValues = JSON.parse(window.prompt('Paste your JSON here'))
    this.ui.load(importValues)
  }

  export() {
    const exportValues = this.ui.save()
    window.alert(JSON.stringify(exportValues))
  }

  quickload() {
    this.ui.load(this.quickPreset)
  }
  reset() {
    this.ui.reset()
  }
}
