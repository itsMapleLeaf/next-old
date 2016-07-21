<template>
  <p>
    <h2>fchat-next v{{version}}</h2>
    <p>
      <i class='mdi mdi-code-tags'></i> with
      <i class='mdi mdi-heart'></i> by
      <a class='ui-link' href='https://www.f-list.net/c/alexander%20grapevine/' target='_blank'>Alexander Grapevine</a>
    </p>
    <p>Note me if you have any suggestions, or if you found a bug. There are probably lots of them.</p>
    <p>
      <a class='ui-link' href='https://github.com/Kingdaro/fchat/blob/master/docs/TODO.md' target='_blank'>Here's</a> a list of things already planned for addition.
    </p>
    <p><a class='ui-link' href='https://github.com/Kingdaro/fchat' target='_blank'>View the code on GitHub</a></p>
  </p>
</template>

<script>
import {version} from '../modules/meta'

export default {
  data () {
    return { version }
  }
}
</script>
