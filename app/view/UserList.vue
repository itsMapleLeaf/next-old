<template>
  <div>
    <a v-for='user in users' :class="'flex flex-justify-space-between ui-padding-1 ' + getHighlight(user)" href='#'>
      <strong :class="'gender-color ' + user.gender">{{user.name}}</strong>
      <span>
        <i class='mdi mdi-heart' v-if='user.isFriend'></i>
        <i class='mdi mdi-star' v-if='user.isBookmark'></i>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  },

  methods: {
    getHighlight (char) {
      return char.isFriend ? 'highlight-green'
        : char.isBookmark ? 'highlight-blue'
        : ''
    }
  }
}
</script>
