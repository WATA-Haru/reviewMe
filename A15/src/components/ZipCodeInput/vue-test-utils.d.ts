import { DOMWrapper } from '@vue/test-utils'

/**
 *
 * @description
 * pluginの導入のため: [Test Id Plugin](https://test-utils.vuejs.org/guide/extending-vtu/plugins#Data-Test-ID-Plugin)を参照
 *
 * ts対応は[issue](https://github.com/vuejs/test-utils/issues/2465)より
 */
declare module '@vue/test-utils' {
  interface VueWrapper {
    findByTestId(testId: string): DOMWrapper<Element>
  }
}
