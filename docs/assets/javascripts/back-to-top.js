// 回到顶部脚本
console.log('回到顶部脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 创建回到顶部按钮
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #4285f4;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 9999;
    opacity: 0.7;
    transition: opacity 0.3s;
  `;
  
  // 鼠标悬停效果
  backToTopButton.onmouseover = function() {
    this.style.opacity = '1';
  };
  backToTopButton.onmouseout = function() {
    this.style.opacity = '0.7';
  };
  
  // 点击事件
  backToTopButton.onclick = function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  document.body.appendChild(backToTopButton);
  
  // 监听滚动事件，控制按钮显示/隐藏
  window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
});