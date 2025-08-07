---
title: 评论系统配置指南
date: 2024-01-01
categories:
  - 配置
tags:
  - Giscus
  - 评论系统
---

# 🔧 评论系统配置指南

本博客使用 **Giscus** 作为评论系统，基于 GitHub Discussions 实现。以下是详细的配置步骤：

## 📋 前置要求

1. **GitHub 仓库**：你的博客源码仓库
2. **公开仓库**：仓库必须是公开的
3. **启用 Discussions**：在仓库设置中启用 Discussions 功能

## 🚀 配置步骤

### 1. 启用 GitHub Discussions

1. 进入你的博客仓库
2. 点击 **Settings** 标签
3. 向下滚动到 **Features** 部分
4. 勾选 **Discussions** 选项

### 2. 安装 Giscus App

1. 访问 [Giscus App](https://github.com/apps/giscus)
2. 点击 **Install** 按钮
3. 选择你的博客仓库进行安装

### 3. 获取配置信息

1. 访问 [Giscus 配置页面](https://giscus.app/zh-CN)
2. 输入你的仓库信息：`用户名/仓库名`
3. 选择页面 ↔️ discussions 映射关系：推荐选择 **pathname**
4. 选择 Discussion 分类：推荐选择 **General**
5. 复制生成的配置信息

### 4. 更新博客配置

将获取到的信息更新到以下文件：

#### 更新 `mkdocs.yml`
```yaml
extra:
  comments:
    provider: giscus
    repo: xiaobotester/myblog
    repo_id: R_kgDONhqJJw
    category: General
    category_id: DIC_kwDONhqJJ84ClGWs
```

#### 更新 `docs/javascripts/comments.js`
```javascript
script.setAttribute('data-repo', 'xiaobotester/myblog');
script.setAttribute('data-repo-id', 'R_kgDONhqJJw');
script.setAttribute('data-category-id', 'DIC_kwDONhqJJ84ClGWs');
```

## 🎨 自定义样式

你可以在 `docs/stylesheets/extra.css` 中添加评论系统的自定义样式：

```css
/* 评论区样式 */
#comments {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--md-default-fg-color--lightest);
}

#comments h3 {
    color: var(--md-primary-fg-color);
    margin-bottom: 1rem;
}

/* Giscus 评论框样式调整 */
.giscus-frame {
    border-radius: 8px;
    border: 1px solid var(--md-default-fg-color--lightest);
}
```

## 🔍 测试评论功能

1. 部署你的博客
2. 访问任意文章页面
3. 滚动到页面底部查看评论区
4. 尝试发表一条测试评论

## 📝 注意事项

- 评论系统只在文章页面显示，首页不会显示
- 用户需要 GitHub 账号才能评论
- 评论数据存储在 GitHub Discussions 中
- 支持 Markdown 语法和表情符号
- 自动适配深浅色主题

## 🛠️ 故障排除

### 评论区不显示
- 检查仓库是否公开
- 确认已启用 Discussions 功能
- 验证配置信息是否正确

### 主题不匹配
- 确保 JavaScript 文件正确加载
- 检查主题切换监听器是否正常工作

### 评论无法加载
- 检查网络连接
- 确认 Giscus App 已正确安装
- 验证仓库权限设置

---

配置完成后，你的博客就拥有了功能完整的评论系统！🎉