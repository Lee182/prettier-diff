<template lang="pug">

.hello
  h1 {{ msg }}
  .links(v-for='section in links')
    h2 {{section.title}}
    ul
      lia(
        v-for="(link, index) in section.links"
        :key="index"
        :href="link[0]"
        :text="link[1]")
    br

</template>

<script lang="coffeescript">

import lia from './lia.vue'
export default {
  name: 'hello',
  data: ->
      msg: 'Welcome to Your Vue.js PWA'
      links: [
        {
          title: 'Essential Links'
          links: [
            ['https://vuejs.org', "Core Docs"]
            ['https://forum.vuejs.org', "Forum"]
            ['http://chat.vuejs.org/', "Vue Community Chat"]
            ['https://twitter.com/vuejs', "Twitter"]
            ['http://vuejs-templates.github.io/webpack/', "Docs for This Template"]
          ]
        }
        {
          title: 'Community'
          links: [
            ['http://router.vuejs.org/', "vue-router"]
            ['http://vuex.vuejs.org/', "vuex"]
            ['http://vue-loader.vuejs.org/', "vue-loader"]
            ['https://github.com/vuejs/awesome-vue', "awesome-vue"]
          ]
        }
      ]
  components: {lia}
}

</script>

<style lang="stylus">

h1, h2
  font-weight normal

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
a
  color #35495E

</style>
