<template>
  <div>
    <a v-for='user in users' class='ui-block ui-padding-1' href='#'>
      <strong :class="'gender-color ' + user.gender">{{user.name}}</strong>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    users: Array
  }
}
</script>
