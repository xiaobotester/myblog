document.addEventListener("DOMContentLoaded", function() {
  var commentContainer = document.createElement("div");
  commentContainer.id = "utterances-comment";
  
  var article = document.querySelector(".md-content__inner");
  if (article) {
    article.appendChild(commentContainer);
    
    var script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "xiaobotester/myblog"); // 使用你的 GitHub 用户名和仓库名
    script.setAttribute("issue-term", "pathname");
    
    // 根据当前主题设置 utterances 主题
    var theme = document.querySelector("body").getAttribute("data-md-color-scheme");
    script.setAttribute("theme", theme === "slate" ? "github-dark" : "github-light");
    
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    
    commentContainer.appendChild(script);
    
    // 监听主题切换事件
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === "data-md-color-scheme") {
          var newTheme = document.querySelector("body").getAttribute("data-md-color-scheme");
          var utterances = document.querySelector(".utterances-frame");
          if (utterances) {
            utterances.contentWindow.postMessage({
              type: "set-theme",
              theme: newTheme === "slate" ? "github-dark" : "github-light"
            }, "https://utteranc.es");
          }
        }
      });
    });
    
    observer.observe(document.querySelector("body"), { attributes: true });
  }
});