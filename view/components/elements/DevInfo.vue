<template >
  <em>
    <p>fchat-next alpha v{{version}}</p>
    <p>
      <i class='fa fa-code'></i> with
      <i class='fa fa-heart'></i> by
      <a class='ui link' href='https://www.f-list.net/c/alexander%20grapevine/' target='_blank'>Alexander Grapevine</a><br />
      Note me for questions, concerns, suggestions, and comments.
    </p>
    <p><a class='ui link' href='https://github.com/Kingdaro/fchat'>View the Code on GitHub</a></p>
    <p><strong>Warning:</strong> buggy and incomplete. Many things do not work.</p>
  </em>
</template>

<style lang="stylus" scoped></style>

<script>
import {version} from '../../../package.json'

export default {
  data () {
    return { version }
  }
}
</script>
