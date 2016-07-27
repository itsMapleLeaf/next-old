<template>
  <form @submit.prevent>
    <div class='ui-input-icon-right ui-fit-width ui-field'>
      <i class='ui-icon mdi mdi-chevron-down'></i>
      <input type='text' placeholder='Status dropdown' />
    </div>
    <div class='ui-input-icon-right ui-fit-width ui-field'>
      <i class='ui-icon mdi mdi-pencil'></i>
      <textarea placeholder='Status...'></textarea>
    </div>
    <div class='ui-field'>
      <button class='ui-button ui-small' action='submit'>Update</button>
    </div>
  </form>
</template>
