const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg'];
const alts = {
    'pic1.jpg': 'Human eye close up',
    'pic2.jpg': 'Wave like rock formation',
    'pic3.jpg': 'Purple and white flowers',
    'pic4.jpg': 'Ancient Egyptian wall painting',
    'pic5.jpg': 'Butterfly on a leaf'
  };

/* Declaring the alternative text for each image file */

/* Looping through images */

/* Looping through images */
images.forEach(image => {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/${image}`);
    newImage.setAttribute('alt', alts[image]);
    
    // 添加点击事件监听器
    newImage.addEventListener('click', () => {
      displayedImage.setAttribute('src', `images/${image}`);
      displayedImage.setAttribute('alt', alts[image]);
    });
    
    thumbBar.appendChild(newImage);
  });



const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);




/* Wiring up the Darken/Lighten button */
/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
    const currentClass = btn.getAttribute('class');
    
    if (currentClass === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });