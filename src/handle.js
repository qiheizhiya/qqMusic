import {getData, render, popupListShow, renderPopupList, renderIsLike} from "./render.js"  // 这个模块用来 数据和渲染函数
import audioObj from "./audio.js";  // 得到音频对象
import Index from "./getIndex.js"; // 这个模块 是用来处理下标的
let indexObj = null;  // 下标对象
let data_list = []; // 数据
let rotateTimer = null; // 旋转图片定时器 
// 拿到五个按钮
const [likeBtn, prevBtn, ispauseBtn, nextBtn, listBtn] = document.querySelector(".control").children;
//旋转图片
const record = document.querySelector('.songImg img');	
// 拿到数据
getData().then(res=>{
  indexObj = new Index(res.length);
  data_list = res;
  renderPopupList(res,indexObj.index,getPopupListClickIndex);
  render(res[indexObj.index],indexObj.index);
  audioObj.load(res[indexObj.index].audioSrc);
  audioObj.end(()=>{
    switchMusic("next");
  })
  if(audioObj.status === "play"){
    audioObj.play();
    ispauseBtn.className = "playing";
    imgRotate(0);
  }
});
/**
 * 得到分类点击的下标,联动indexObj的index  
 * @param {*} i 
 */
function getPopupListClickIndex(i){
  indexObj.index = i;
  switchMusic('',false);
}
// 切歌
function switchMusic(type,change = true){
  if(change){
    type === "prev" ? indexObj.prev() : indexObj.next();
  }
  render(data_list[indexObj.index],indexObj.index);
  audioObj.load(data_list[indexObj.index].audioSrc);
  audioObj.status = "play";
  audioObj.play();
  ispauseBtn.className = "playing";
  audioObj.aboveX = 0;
  imgRotate(0);
}
// 播放开始的时候图片旋转
function imgRotate(deg){
  rotateTimer && (clearInterval(rotateTimer));
  rotateTimer = setInterval(() => {
    deg += 0.2;
    record.style.transform = `rotate(${deg}deg)`;
    record.dataset.rotate = deg;
  },16)
}
/**
 * 上一首
 */
prevBtn.addEventListener("touchend",(e) => {
  switchMusic("prev")
})
// 是否喜欢
likeBtn.addEventListener("click", e => {
  data_list[indexObj.index].isLike = !data_list[indexObj.index].isLike;
  renderIsLike(data_list[indexObj.index].isLike);
})
/**
 * 下一首
 */
nextBtn.addEventListener("click",(e) => {
  switchMusic("next");
})

// 播放和暂停
ispauseBtn.addEventListener("click",e => {
  if(audioObj.status === "pause"){
    ispauseBtn.className = "playing";
    audioObj.status = "play";
    audioObj.play();
    const deg = +record.dataset.rotate || 0;
    imgRotate(deg);
  }else{
    clearInterval(rotateTimer);
    ispauseBtn.className = "";
    audioObj.status = "pause";
    audioObj.pause()
  }
})
// 菜单显示
listBtn.addEventListener("click",(e) => {
  const list = document.querySelector(".list");
  popupListShow(list);
})