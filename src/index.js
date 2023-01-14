import $ from 'jquery'
import './css/index.css'
import './less/index.less'
import imgUrl from './assets/1.gif'
import './assets/fonts/iconfont.css'

const theImg = document.createElement('img')
theImg.src = imgUrl
document.body.appendChild(theImg)

const fn = () => {
  console.log('你好babel')
}

console.log(fn)

$(function () {
  $('#app li:nth-child(odd)').css('color', 'red')
  $('#app li:nth-child(even)').css('color', 'green')
})
