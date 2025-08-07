// 图片懒加载脚本
console.log('图片懒加载脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 获取所有图片
  const images = document.querySelectorAll('img[data-src]');
  
  // 创建交叉观察器
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.onload = function() {
            image.removeAttribute('data-src');
          };
          imageObserver.unobserve(image);
        }
      });
    });
    
    // 观察所有图片
    images.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    // 对于不支持IntersectionObserver的浏览器，直接加载所有图片
    images.forEach(function(image) {
      image.src = image.dataset.src;
    });
  }
});