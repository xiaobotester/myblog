# Utterances 评论系统设置指南

## 问题描述

如果你在浏览器控制台看到以下错误：
```
GET https://api.github.com/repos/xiaobotester/myblog/contents/utterances.json?ref=master 404 (Not Found)
```

这是因为 Utterances 评论系统在初始化时尝试获取配置文件但找不到。

## 解决方案

### 1. 创建配置文件 ✅

我已经为你创建了 `utterances.json` 配置文件，包含以下设置：

```json
{
  "repo": "xiaobotester/myblog",
  "issueTerm": "pathname",
  "mapping": "pathname",
  "label": "💬 博客评论",
  "theme": "github-light",
  "crossorigin": "anonymous"
}
```

### 2. 安装 Utterances GitHub 应用

1. 访问 [Utterances 应用页面](https://github.com/apps/utterances)
2. 点击 "Install" 按钮
3. 选择你的 `xiaobotester/myblog` 仓库
4. 完成安装

### 3. 确保仓库设置正确

- **仓库可见性**：确保你的仓库是公开的，或者 Utterances 应用有访问权限
- **仓库权限**：Utterances 需要创建 issue 的权限

### 4. 验证配置

安装完成后，访问你的博客页面，评论区应该能正常加载。

## 配置说明

- `repo`: GitHub 仓库名称（格式：用户名/仓库名）
- `issueTerm`: 使用页面路径作为 issue 标识
- `mapping`: 映射方式，使用路径映射
- `label`: 评论 issue 的标签
- `theme`: 主题设置，支持 `github-light` 和 `github-dark`

## 故障排除

如果仍然出现 404 错误：

1. **检查仓库名称**：确保 `xiaobotester/myblog` 是正确的仓库名称
2. **检查应用安装**：确保 Utterances 应用已正确安装
3. **检查网络**：确保能正常访问 GitHub API
4. **清除缓存**：清除浏览器缓存后重试

## 测试评论功能

1. 访问你的博客页面
2. 滚动到页面底部
3. 应该能看到评论区
4. 尝试发表一条测试评论

如果一切正常，你应该能在 GitHub 仓库的 Issues 页面看到新创建的 issue。 