import { config, type VueWrapper} from '@vue/test-utils'

/**
 *
 * @description
 * 1. コンポーネントにdata-testidを設定する
 * 2. wrapper(Component).findByTestId('yoru-test-id')を行う
 * これにより、テスト専用のaliasが作成できる。詳しくは[Test Id Plugin](https://test-utils.vuejs.org/guide/extending-vtu/plugins#Data-Test-ID-Plugin)を参照
 *
 * ts対応は[issue](https://github.com/vuejs/test-utils/issues/2465)より
 */
const FindByTestIdPlugin = (wrapper: VueWrapper) => {
  function findByTestId(selector: string) {
    const dataSelector = `[data-testid='${selector}']`
    const element = wrapper.find(dataSelector)

    if (!element) {
      throw new Error(`Element with data-testid "${selector}" not found`)
    }

    return element
  }

  return {
    findByTestId,
  }
}

config.plugins.VueWrapper.install(FindByTestIdPlugin)
