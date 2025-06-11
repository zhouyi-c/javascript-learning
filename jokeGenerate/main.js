const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

/* 
1.先获取页面元素，对哪些元素进行操作
queryselector 和getelementbyid都是为了获得dom元素
专门用于获取 ​​ID​​ 为 customname 的元素（<input id="customname">）。
​​特点​​：
只适用于 id 选择器（#customname）。
性能比 querySelector 稍高（因为浏览器优化了 getElementById）。





*/
function randomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//设计随机选择函数

/* 
Math.random() 生成 0-1 的随机数,乘以数组长度得到 0 到 length-1 的范围
Math.floor() 向下取整得到有效的数组索引

*/

let storyText = '今天气温 34 摄氏度，:inserta:出去遛弯。当走到:insertb:门前时，突然就:insertc:。人们都惊呆了，李雷全程目睹但并没有慌，因为:inserta:是一个 140 公斤的胖子，天气又辣么热。'

let insertX = ['怪兽威利','大老爹','圣诞老人'] 
let insertY = ['肯德基','迪士尼乐园','白宫'] 
let insertZ = ['自燃了','在人行道化成了一坨泥','变成一条鼻涕虫爬走了']
//设计故事模板和随机词汇库


//绑定点击事件
randomize.addEventListener('click', result);//这里result是函数名没有括号表示点击按钮调用函数

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);
  
  newStory = newStory.replace(':inserta:', xItem);
  newStory = newStory.replace(':inserta:', xItem);
  newStory = newStory.replace(':insertb:', yItem);
  newStory = newStory.replace(':insertc:', zItem);
  /*
  newStory = newStory.replaceAll(':inserta:', xItem);
newStory = newStory.replaceAll(':insertb:', yItem); 
newStory = newStory.replaceAll(':insertc:', zItem);
一次性替换所有
*/
  if(customName.value !== '') {
    let name = customName.value;
    newStory = newStory.replace('李雷', name);
  }
  //处理姓名替换
  if(document.getElementById("american").checked) {
    const weight = Math.round(140 * 2.20462) + ' 磅';
    const temperature = Math.round(34 * 9 / 5 + 32) + ' 华氏度';
    newStory = newStory.replace('34 摄氏度', temperature);
    newStory = newStory.replace('140 公斤', weight);
  }
  //单位转换
  story.textContent = newStory;//设置文本内容
  story.style.visibility = 'visible';//让故事可见
}

/* 
 JavaScript编程的核心思维:

JavaScript的本质：让网页"动起来"

HTML = 骨架（内容结构）
CSS = 皮肤（样式外观）
JavaScript = 大脑（交互逻辑）


1.先获取页面元素，对哪些元素进行操作

JavaScript必须先"抓住"页面元素，才能操控它们


2.分析需求


3.识别页面元素

4.获取元素

5.设计交互逻辑  例如点击按钮







*/