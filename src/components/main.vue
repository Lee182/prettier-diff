<template lang="pug">
div
  .diffhtml-modal(v-show='diffopen' v-html='diffhtml')
  .monaco-wrap(v-show='!diffopen')
    MonacoEditor(
      v-for="i in 2"
      :key="'mon'+i"
      :height="height"
      :width="width"
      :language="lang"
      :code="code[i-1]"
      :editorOptions="editorOptions"
      @mounted="onMounted($event, i-1)"
      @codeChange="onCodeChange($event, i-1)")
  .globalbtns
    portal(to="action-primary")
      .group-btn-wrap(@click='generateDiff' v-show='!diffopen'): .group-btn
        span diff
      .group-btn-wrap(@click='closeDiff' v-show='diffopen'): .group-btn
        span edit
    portal(to="action-pretty")
      .group-btn-wrap(@click='prettifyCode()'): .group-btn
        img(src='../assets/pretty.png')
    portal(to="action-ugly")
      .group-btn-wrap(@click='uglifyCode()'): .group-btn
        img(src='../assets/ugly.png')

</template>

<script lang="coffeescript">
import svgArrow from '@/assets/ic_compare_arrows_black_24px.svg'
import svgCopy from '@/assets/ic_content_copy_black_24px.svg'
import svgClose from '@/assets/ic_close_black_24px.svg'
import svgUgly from '@/assets/ugly.svg'

import {cloneDeep} from 'lodash'
import MonacoEditor from 'vue-monaco-editor'
import code from '@/assets/code.js'

import * as diff from 'diff'
import {Diff2Html} from 'diff2html'


apiUrl = ""

copyToClipboard = (text) ->
  if window.clipboardData and window.clipboardData.setData
    # IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text)
  else if document.queryCommandSupported and document.queryCommandSupported('copy')
    textarea = document.createElement('textarea')
    textarea.textContent = text
    textarea.style.position = 'fixed'
    # Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild textarea
    textarea.select()
    try
      return document.execCommand('copy')
      # Security exception may be thrown by some browsers.
    catch ex
      console.warn 'Copy to clipboard failed.', ex
      return false
    finally
      document.body.removeChild textarea

wait = (ms) ->
  new Promise (resolve) ->
    setTimeout resolve, ms
reqprettier = (code) ->
  await wait 500
  return '// abcd \n' + code

export default
  data: ->
    editorOptions:
      glyphMargin: false
    diffhtml: ''
    code: [cloneDeep(code.a), cloneDeep(code.b)]
    height: '100%'
    width: '100%'
    lang: 'javascript'
    prettierOptions:
      'no-semi': true
      'jsx-bracket-same-line': true
      'single-quote': true
      'no-bracket-spacing': false
  computed:
    diffopen: ->
      @diffhtml != ""
  methods:
    onMounted: () ->
      undefined
    onCodeChange: (editor, i) ->
      @$set(@code, i, editor.getValue())
    prettifyCode: () ->
      console.log 'prettifyCode', apiUrl
      try
        response = await fetch "#{apiUrl}/transform-code",
          method: 'post'
          headers:
            'Content-Type': 'application/json'
          body: JSON.stringify
            code: @code
            options: @prettierOptions
            name: 'prettier'
        data = await response.json()
        @$set(@, 'code', data.code)
      catch err
        console.error(err)
      # @$set(@code, i, prettycode)
    uglifyCode: ->
      response = await fetch "#{apiUrl}/transform-code",
        method: 'post'
        headers:
          'Content-Type': 'application/json'
        body: JSON.stringify
          code: @code
          options: {}
          name: 'uglifyjs'
      data = await response.json()
      @$set(@, 'code', data.code)
    copyCode: (i) ->
      copyToClipboard(@code[i])
    generateDiff: ->
      patch = diff.createPatch('fileName', @code[0], @code[1], 'oldHeader', 'newHeader')
      @diffhtml = Diff2Html.getPrettyHtml patch,
        inputFormat: 'diff'
        outputFormat: 'side-by-side'
        showFiles: true
        matching: 'lines'
    closeDiff: ->
      @diffhtml = ''




  components: {MonacoEditor, svgArrow, svgCopy, svgClose, svgUgly}
</script>

<style lang="stylus">
@require '../assets/diff2html.styl'
.d2h-info
.d2h-file-header
.d2h-file-list-header
.d2h-file-list-wrapper
  display none
.d2h-code-line-prefix
  opacity .3
.d2h-file-wrapper
  border: none
.d2h-diff-table
  font-family "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback"
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color #d4d4d4
.d2h-code-side-linenumber
  border-right none
.d2h-code-line-prefix
.d2h-code-side-linenumber
  -moz-user-select none
  user-select none
.d2h-file-side-diff
  position relative
.d2h-code-side-line
  margin-left 25.5px
.d2h-diff-table
  font-family Menlo, Monaco, "Courier New", monospace
  font-weight 400
  font-size 12px
  line-height 18px !important
  color #d4d4d4
.d2h-diff-tbody
  & > tr
    & > td
      height 18px
      line-height 18px
.d2h-code-side-linenumber
  width 41px
.decorationsOverviewRuler
  opacity 0




$cback = #1E1E1E

.diffhtml-modal
  width 100%
  // z-index 999999
  background $cback
  // box-sizing content-box
  padding-bottom 1rem
  padding-right 1rem
.monaco-wrap
  height calc(100vh - 56px)
  overflow hidden
  display flex
  flex-flow row-wrap

.glyph-margin
  width 0 !important
.line-numbers
  left 0 !important
.monaco-scrollable-element
  left calc(69px - 19px) !important

.globalbtns
  position fixed
  bottom 0
  left 0
  display flex
  flex-flow row wrap
  justify-content space-between
  align-items center
  width 100%
  z-index 999999
  .group
    padding .5rem
    display flex

.group-btn-wrap
  padding .25rem
  height 3rem
.group-btn
  height 3rem
  background #35495e
  color white
  display flex
  justify-content center
  align-items center
  padding-left .5rem
  &.circle
    border-radius 50%
    width 2rem!important
    height 2rem!important
    overflow hidden
    background-color lighten($cback, 10)
    display flex
    justify-content center
    align-items center
  span
    padding .5rem
  svg
  img
    height 2rem
    width 2rem
  svg
    fill white
  border-radius .2rem
  transition .1s ease
  &:active
    transform scale(.95)

</style>
