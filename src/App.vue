<template lang="pug">

#app
  header
    portal-target(name="header-select")
    .flex-gap
    portal-target(name="action-primary")
    portal-target(name="action-pretty")
    portal-target(name="action-ugly")
  main
    router-view

</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
@require './assets/jonoreset.styl'
@import '../node_modules/vuetify/src/stylus/main.styl'
.flex-gap
  flex-grow 1
body
  overflow hidden
#app
  overflow hidden
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #fff
  background #1E1E1E

header
  max-width 100vw
  width 100%
  display flex
  flex-flow row wrap
  margin 0
  height 56px
  padding 0 16px 0 24px
  background-color #35495E
  color #ffffff
  h1
    display block
    position relative
    font-size 20px
    line-height 1
    letter-spacing .02em
    font-weight 400
    box-sizing border-box
    padding-top 16px

main
  height calc(100vh - 56px)
  overflow-y scroll
  background #1E1E1E

</style>
