import PinYinSearch from './components/PinYinSearch'
import RForm from './components/RForm'
import RouterTabs from './components/RouterTabs'

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