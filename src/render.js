import $ from "jquery";
var root = window.player;
var wrap = document.getElementById("wrap");
export function getData() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "../public/mock/data.json",
            method: "GET",
            success(res) {
                resolve(res);
            }
        })
    })
}

function renderInfo(data) {
    var songInfoChildren = document.querySelector('.songInfo').children;
    songInfoChildren[0].innerHTML = data.name;
    songInfoChildren[1].innerHTML = data.singer;
    songInfoChildren[2].innerHTML = data.album;
}
//渲染当前这首歌的图片
function renderImg(src) {
    root.blurImg(src); //给body添加背景图片
    var img = document.querySelector('.songImg img');
    img.src = src;
}

export function renderIsLike(isLike) {
    var lis = document.querySelectorAll('.control li');
    lis[0].className = isLike ? 'liking' : '';
}
export function render(data, index = 0) {
    renderInfo(data);
    renderImg(data.image);
    renderIsLike(data.isLike);
    addActive(index);
}
export function renderPopupList(dataArr, i = 0, cb) {
    const div = document.createElement("div");
    div.className = "list";
    const dl = document.createElement("dl");
    const dt = document.createElement("dt");
    dt.innerHTML = "播放列表";
    dl.appendChild(dt);
    const closeDiv = document.createElement("div");
    closeDiv.innerHTML = "关闭";
    closeDiv.className = "close";
    closeDiv.addEventListener("click", () => {
        popupListHidden(div);
    })
    dataArr.forEach((item, index) => {
        const dd = document.createElement("dd");
        if (index === i) {
            dd.className = "active";
        }
        dd.innerText = item.name;
        dl.appendChild(dd);
    })
    div.appendChild(dl);
    div.appendChild(closeDiv);
    wrap.appendChild(div);
    changeMusic(cb);
}
export function popupListShow(ele) {
    ele.style.transition = "all .2s linear";
    ele.style.transform = "translateY(0)"
}

function popupListHidden(ele) {
    const height = ele.clientHeight;
    ele.style.transition = "all .2s linear";
    ele.style.transform = `translateY(${2000}px)`;
}
// 切歌
function changeMusic(cb) {
    const dds = document.querySelectorAll("dd");
    const ele = document.querySelector(".list");
    dds.forEach((item, index) => {
        item.addEventListener("click", () => {
            cb(index);
            popupListHidden(ele);
        })
    })
}

// 高亮
function addActive(index) {
    const dds = document.querySelectorAll("dd");
    (wrap.querySelector(".active")).className = "";
    dds[index].className = "active";
}