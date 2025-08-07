// 进度条脚本
console.log('进度条脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 创建进度条元素
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(to right, #4285f4, #34a853, #fbbc05, #ea4335);
    z-index: 9999;
    transition: width 0.2s ease;
  `;
  document.body.appendChild(progressBar);

  // 监听滚动事件更新进度条
  window.addEventListener('scroll', function() {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollPercentage = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercentage + '%';
  });
});