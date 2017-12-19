import { fetchCharacters, loadAuthData } from '../../auth/actions'
import { StoredValue } from '../../common/util/storage'
import { appStore } from '../../stores'
import { AppState } from '../stores/AppStore'

const storedHasRun = new StoredValue<boolean>('AppStore_hasRun')

export async function init() {
  try {
    await loadAuthData()
    await fetchCharacters()
    appStore.setState(AppState.characterSelect)
  } catch {
    appStore.setState(AppState.login)
  }

  const hasRun = await storedHasRun.restore()
  if (!hasRun) {
    await storedHasRun.save(true)
    appStore.appInfo.show()
  }
}
