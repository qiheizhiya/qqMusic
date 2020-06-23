const progress = document.querySelector(".progress");
let totalTime = 0;
// 当前时间dom，进度dom，总时间dom
const [curTimeDom, dragDom, totalTimeDom] = progress.children;
const [circleDom, frontBgDom, backBgDom] = dragDom.children;
let dragLeft = Math.floor(dragDom.getBoundingClientRect().left); // 拿到滚动条一开始的left值


class AudioManage {
  constructor() {
    this.audio = new Audio(); // 创建一个audio实例
    this.status = "pause"; // 歌曲的状态
    this.timer = null; // 播放器定时器
    this.startX = null; // 记录触摸式的坐标
    this.aboveX = 0; // 记录上一次滑动的位置 
  }
  // 加载音乐
  load(src) {
    this.loadEnd();
    this.audio.src = src;
    this.audio.load();
    this.startListen();
    
  }
  // 开始播放
  play() {
    this.audio.play();
    this.setMoveListen();
    this.status = "play";
  }
  pause() {
    this.audio.pause();
    this.status = "pause";
  }
  //音乐播放完成事件
  end(fn) {
    this.audio.onended = fn;
  }
  // audio加载完成触发的事件
  loadEnd() {
    this.audio.addEventListener("canplay", () => {
      totalTime = this.audio.duration;
      this.formatTime(this.audio.duration, totalTimeDom);
    })
  }
  // 开始监听事件
  startListen() {
    circleDom.addEventListener("touchstart", this.touchstart.bind(this), false);
    circleDom.addEventListener("touchmove", this.touchmove.bind(this), false);
    circleDom.addEventListener("touchend", this.touchend.bind(this), false);
    backBgDom.addEventListener("touchstart", e => {
      if(e.touches[0].pageX > dragLeft){ // 调整误差
        dragLeft -= 4;
      }else{
        dragLeft += 4;
      }
      this.controlBar(e,dragLeft);
      dragLeft = Math.floor(e.touches[0].pageX);
      this.controlTime();
    },false)
  }
  touchstart(e) {
    this.removeMoveListen();
    var touch = e.touches[0];
    this.startX = touch.pageX;
  }

  touchmove(e) {
    dragLeft = Math.ceil(e.touches[0].pageX);
    this.controlBar(e,this.startX);
  }
  // 控制进度条
  controlBar(e,startX){
    var touch = e.touches[0];
    this.diffx = Math.ceil(touch.pageX) - startX ;
    let barWidth = this.aboveX + (this.diffx / totalTime) * 100; // 计算出进度条的宽度
    if (barWidth >= 100) {
      barWidth = 100;
    }else if(barWidth <= 0){
      barWidth = 0;
    }
    
    frontBgDom.style.width = barWidth + "%";
    circleDom.style.left = barWidth + "%";
  }
  touchend(e) {
    this.setMoveListen();
    this.controlTime();
  }
  // 设置播放事件监听
  setMoveListen(){
    this.audio.ontimeupdate = () => {
      const barWidth = (this.audio.currentTime / this.audio.duration) * 100; // 计算出进度条的宽度
      frontBgDom.style.width = barWidth + "%";
      circleDom.style.left = barWidth + "%";
      this.formatTime(this.audio.currentTime, curTimeDom)
    }
  }
  removeMoveListen(){
    this.audio.ontimeupdate = null;
  }
  // 控制时间
  controlTime(){
    this.status === "play" ? this.play() : "";
    this.aboveX = parseInt(circleDom.style.left);
    if (this.aboveX >= 100) {
      this.aboveX = 100;
    }
    let time = totalTime * (this.aboveX / 100);
    this.formatTime(time, curTimeDom);
    this.audio.currentTime = time || 0;
  }
  formatTime(totalTime, ele) {
    let minute = parseInt((totalTime / 60)).toString().padStart(2, "0");
    let second = parseInt((totalTime) % 60).toString().padStart(2, "0");
    ele.innerText = `${minute}:${second}`;
  }
}


export default new AudioManage();