
<template lang="pug">
mixin head(path, showAccount, isTitle)
  .head-row.flex-row(v-show=`head.show === '`+path+`'`)
    if !isTitle
      .head-icon.flex-center(@click=`route__back()`)
        .circle.flex-center
          i.fa.fa-chevron-left(style='font-size: 1rem')
    .head-title.flex-center: h2.ellipsis
      block
    if showAccount
      .flex-gap
      //- notifcations
      .head-icon.head-bell.flex-center(
        v-if='user__got_login && is_user'
        @click=`route__go('/notifcations', 'pushState')`
        ): .circle.flex-center
          i.fa.fa-bell-o
          .bell-count(v-show='unread_count !== 0') {{ unread_count }}

      .head-icon.ellipsis-tog.flex-center(
        :class='{active: head.menu.open}'
        @click='head__elipsis_tog(head.menu)'
        v-if='user__got_login && is_user'
        ).flex-center
          .head-avatar.flex-center(
            v-if='false'
            )
            i.fake-avatar.fa.fa-user-circle-o
          img.head-avatar(
            v-if='is_user',
            :src=`'https://twitter.com/'+user._id+'/profile_image'`)

      .head-button-text.flex-center(
        v-if='user__got_login && !is_user'
        )
        a(href='/tw.login') login
.head.md1
  +head('/', true, true) #booktrade
  +head('/me', true) {{ account_title }}
  +head('/user/:user_id', true) {{ account_title }}
  +head('/me_books', true) Me Books
  +head('/me_books/add', false) Add Book
  +head('/book/:book_id', true) {{ sb_title }}
  +head('/notifcations', true) Me Notifcations
.ellipsis-fullscreen(
  :class='{show: head.menu.open, darkroom: head.menu.open}'
  @mousedown='ellipsis_clickaway($event, head.menu)'
  @touchstart='ellipsis_clickaway($event, head.menu)'
  )
nav.ellipsis-menu.md2(:class='{show: head.menu.open}')
  li
    i.fa.fa-refresh
    span.bit-horizontal
    | refresh
  li(@click='user__btn__settings()')
    i.fa.fa-cog
    span.bit-horizontal
    | me account
  li(@click='user__btn__logout()')
    i.fa.fa-sign-out
    span.bit-horizontal
    | logout

</template>

<script lang="coffeescript">
export default =
    data: ->
        head:
            menu:
                open: false
                show: undefined
    methods:
        head__elipsis_tog: (menu) ->
            menu.open = !menu.open
        ellipsis_clickaway: (e, menu) ->
            const clickOutSideMenu = e.target.matches('.ellipsis-fullscreen.show')
            if clickOutSideMenu
                menu.open = false
</script>


<style lang="stylus">

$main_color = rgba(#6e3124, 0.73)// rgb(110, 36, 90)
.head
  min-height 3rem
  color #fff
  background-image url('/bookshelf.jpg')
  position relative
  z-index 200
  // http://ebookfriendly.com/wp-content/uploads/2013/11/Library-a-book-wallpaper-540x405.jpg)
  &-row
    min-height 3rem
    align-items stretch
    background-color $main_color

  &-title
    padding 0 1rem
    max-width calc(100vw - 9rem)
  &-button-text
    text-transform uppercase
    font-size .85rem
    font-weight 500
    padding 1rem .5rem
    transition background-color .4s ease
    &:hover
      background-color #bdb2b24d
  &-icon
    padding 0 .25rem
    i
      font-size 1.3rem
  &-avatar
    border-radius 50%
    height 32px
    width 32px
    border 2px solid white
    box-sizing content-box
.circle
  width 2rem
  height 2rem
  border-radius 50%
  transition background-color .4s ease
  &:hover
    background-color #bdb2b24d

.head-icon.active
  .circle
    background-color #bdb2b24d

i.fake-avatar
  font-size 1.75rem
  background #5c281c99
  border-radius 50%

.nav
  display flex
  position relative
  flex-flow row nowrap
  align-items stretch
  overflow-x scroll
  &-active
    position absolute
    bottom 0px
    transition all .4s ease
    left 0
    width 4.5rem
    padding 2px
    background white
  &-item
    padding 1rem
    // flex 1
    padding-top 1.25rem
    align-self stretch
    user-select none
    list-style none
    transition background-color .4s ease
    &:hover
      background-color #bdb2b24d
.nav-bottom
  .nav-item
    padding .5rem 1rem 1rem 1rem
  background-color $main_color



.ellipsis-tog.active
  z-index 2001
.ellipsis-fullscreen
  &.darkroom
    background-color rgba(0,0,0,.5)
  height 100vh
  width 100vw
  position fixed
  top 0
  left 0
  z-index 2000
  display none
  &.show
    display block

.ellipsis-menu
  position fixed
  top 3rem
  z-index 2001
  display none
  &.show
    display block
  right .75rem
  background #fafafa
  color black
  border-radius .25rem
  li
    user-select none
    list-style none
    padding 1rem
    min-width 11rem
    transition background .4s ease
    &:hover
    &.active
      background #bdb2b24d
</style>
