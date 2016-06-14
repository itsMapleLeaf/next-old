<template>
  <div class='overlay-shade'>
    <div class='panel material-shadow'>
      <h1>Channel List</h1>
      <selection-list>
        <selection-list-item v-for='info in getAllChannels.slice(0, 200)'>
          {{ info.title || info.name }}
        </selection-list-item>
      </selection-list>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import SelectionListItem from './SelectionListItem.vue'
import {getAllChannels} from '../vuex/getters'

export default {
  components: {
    SelectionList,
    SelectionListItem
  },

  vuex: {
    getters: {
      getAllChannels
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/components'

.panel
  width: 20em
</style>
