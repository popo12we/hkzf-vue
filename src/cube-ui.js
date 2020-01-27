import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  /* eslint-disable no-unused-vars */
  Style,
  // basic
  Loading,
  // form
  Input,
  Validator,
  Upload,
  Form,
  // popup
  Toast,
  Picker,
  CascadePicker,
  // scroll
  IndexList
} from 'cube-ui'
Vue.use(Loading)
Vue.use(Input)
Vue.use(Validator)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(IndexList)
