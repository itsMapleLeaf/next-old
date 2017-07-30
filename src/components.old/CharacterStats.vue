<template>
  <Overlay header='Stats' @closed="$emit('closed')">
    <div class='content'>
      <table class='stats-table'>
        <thead>
          <td>
            <i class='mdi mdi-gender-transgender'></i>
          </td>
          <td>
            <i class='mdi mdi-pound'></i>
          </td>
          <td>
            <i class='mdi mdi-percent'></i>
          </td>
        </thead>
        <tr v-for='gender in genders' :key="gender">
          <td>{{ labels[gender] || gender }}</td>
          <td>{{ genderCounts[gender] || 0 }}</td>
          <td>{{ genderPercentages[gender] }}%</td>
        </tr>
      </table>
      <div class='stats-footer'>
        <h3>Total Online: {{ totalCharacters }}</h3>
      </div>
    </div>
  </Overlay>
</template>

<style lang='stylus' scoped>
@require 'vars'

td
  padding: 0.2rem 0.6rem

.stats-footer
  padding: 0.6rem
  text-align: center

.content
  width: 15rem
  padding-top: 0.6rem

.stats-table
  margin: auto

.stats-table
  tr:nth-child(2n)
    background: theme-darker(15%)
  tr:nth-child(2n+1)
    background: theme-darker(30%)
</style>

<script>
import Overlay from './Overlay.vue'
import { getters } from '../store'
import { values } from '../lib/util'

export default {
  components: {
    Overlay,
  },
  computed: {
    ...getters({
      characters: 'onlineCharacters',
    }),
    totalCharacters() {
      return values(this.characters).length
    },
    genders() {
      return [
        'Male',
        'Female',
        'Herm',
        'Shemale',
        'Transgender',
        'Cunt-boy',
        'Male-Herm',
        'None',
      ]
    },
    labels() {
      return {
        'None': 'Genderless',
      }
    },
    genderCounts() {
      const counts = {}
      for (const char of values(this.characters)) {
        counts[char.gender] = counts[char.gender] || 0
        counts[char.gender] += 1
      }
      return counts
    },
    genderPercentages() {
      const percentages = {}
      for (const gender of this.genders) {
        percentages[gender] = Math.round(this.genderCounts[gender] / this.totalCharacters * 100)
      }
      return percentages
    }
  },
}
</script>
