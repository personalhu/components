import PinYinSearch from './PinYinSearch'
import RForm from './RForm'
import RouterTabs from './RouterTabs'

const components = [
  PinYinSearch,
  RForm,
  RouterTabs
]

const install = function (Vue, options) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  PinYinSearch,
  RForm,
  RouterTabs,
  install
}