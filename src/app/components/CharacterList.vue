<template>
  <form class='character-list' @submit.prevent='submit'>
    <fieldset>
      <h2>Select a Character</h2>
    </fieldset>
    <fieldset>
      <div class='selection-list'>
        <a href='#' v-for='name of characters'
          :class="name === current && 'selection-list-active'"
          @click.prevent='current = name'>
          {{ name }}
        </a>
      </div>
    </fieldset>
    <fieldset>
      <button class='button' action='submit'>Go</button>
    </fieldset>
  </form>
</template>

<style lang='stylus' scoped>
.character-list
  text-align: center
</style>

<script>
export default {
  data () {
    return {
      characters: [
        'test1',
        'test2',
        'test3',
        'test4',
        'test5'
      ],
      current: 'test2'
    }
  },
  methods: {
    submit () {
      this.$emit('character-list-submit', this.current)
    }
  }
}
</script>
