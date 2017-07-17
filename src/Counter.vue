<template>
  <div>
    <h1>{{ count }}</h1>
    <p>
      <button @click="decrement">-</button>
      <button @click="increment">+</button>
      <button @click="reset">Reset</button>
    </p>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class extends Vue {
  count = 0

  increment() {
    this.count += 1
  }

  decrement() {
    this.count -= 1
  }

  reset() {
    this.count = 0
  }
}
</script>
