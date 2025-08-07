document.addEventListener("DOMContentLoaded", function() {
  console.log("回到顶部脚本已加载");
  
  // 创建回到顶部按钮
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>';
  backToTopButton.setAttribute('aria-label', '回到顶部');
  backToTopButton.setAttribute('title', '回到顶部');
  document.body.appendChild(backToTopButton);
  
  // 初始状态隐藏
  backToTopButton.style.opacity = '0';
  backToTopButton.style.visibility = 'hidden';
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    // 当页面滚动超过300px时显示按钮
    if (window.scrollY > 300) {
      backToTopButton.style.opacity = '1';
      backToTopButton.style.visibility = 'visible';
    } else {
      backToTopButton.style.opacity = '0';
      backToTopButton.style.visibility = 'hidden';
    }
  });
  
  // 点击事件 - 平滑滚动到顶部
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});