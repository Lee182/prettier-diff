<template lang="pug">

li
  a(:href="href", target='_blank', rel='noopener' @click='click') {{ text }}

</template>
<script lang="coffeescript">
import _ from 'lodash'
export default {
  props: ['text', 'href']
  methods:
    click: (e) ->
      e.preventDefault()
      @.$emit 'click', _.pick(@, ['text', 'href'])
}
</script>
