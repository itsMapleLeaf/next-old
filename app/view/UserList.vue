<template>
  <div>
    <a v-for='user in users' class='ui-block ui-padding-1' href='#'>{{user.name}}</a>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  }
}
</script>
