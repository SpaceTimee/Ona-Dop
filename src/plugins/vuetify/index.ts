import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    VTabs: {
      style: 'min-height: 2.5rem;'
    },
    VTab: {
      style: 'color: hsla(160, 100%, 37%, 1);',
      minHeight: '2.5rem'
    },
    VListItem: {
      style: 'margin-bottom: 1rem;'
    }
  }
})
