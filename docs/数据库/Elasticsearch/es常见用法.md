# Elasticsearch 常见用法

本文档整理了 Elasticsearch 的常用操作和查询方法，包括数据查询、删除等核心功能。

---

## 📊 数据查询

### 1. 指定字段查询

#### Match 查询（全文搜索）

**特点：**
- 用于全文本搜索，适用于字符串字段
- 对输入文本进行分词处理，生成词条进行匹配
- 适用于自然语言查询，支持灵活的文本匹配

**语法示例：**
```json
GET /索引名称/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "field1": "value1" } },
        { "match": { "field2": "value2" } }
      ]
    }
  }
}
```

#### Term 查询（精确匹配）

**特点：**
- 用于精确匹配，适用于关键字字段或不需要分词的字段
- 不对输入文本进行分析，直接作为词条匹配
- 适用于数字、日期、关键字等精确匹配场景

**语法示例：**
```json
GET /索引名称/_search
{
  "query": {
    "bool": {
      "must": [
        { "term": { "status": "active" } },
        { "term": { "category_id": 123 } }
      ]
    }
  }
}
```

### 2. 模糊查询

!!! warning "注意事项"
    前缀查询只能用于 `keyword`、`text` 和 `wildcard` 字段类型，不能用于 `integer` 等数值类型字段。

#### 单字段前缀查询

**适用场景：** 搜索以特定前缀开头的文档

```json
GET /索引名称/_search
{
  "query": {
    "prefix": {
      "isin": "US7452"
    }
  }
}
```

#### 多字段前缀查询

**适用场景：** 在多个字段中搜索相同前缀

```json
GET /索引名称/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "prefix": {
            "field1": "your_prefix"
          }
        },
        {
          "prefix": {
            "field2": "your_prefix"
          }
        }
      ]
    }
  }
}
```

#### 通配符查询

**适用场景：** 使用通配符进行模糊匹配

```json
GET /索引名称/_search
{
  "query": {
    "wildcard": {
      "field_name": "*pattern*"
    }
  }
}
```

---

## 🗑️ 数据删除

### 1. 按 ID 删除单个文档

**语法：**
```http
DELETE /索引名称/_doc/{document_id}
```

**示例：**
```http
DELETE /my_index/_doc/1
```

### 2. 按查询条件删除多个文档

**语法：**
```json
POST /索引名称/_delete_by_query
{
  "query": {
    "term": {
      "field_name": "value_to_match"
    }
  }
}
```

**示例：**
```json
POST /my_index/_delete_by_query
{
  "query": {
    "bool": {
      "must": [
        { "term": { "status": "inactive" } },
        { "range": { "created_date": { "lt": "2023-01-01" } } }
      ]
    }
  }
}
```

### 3. 删除整个索引

!!! danger "危险操作"
    此操作会删除整个索引及其所有数据，请谨慎使用！

```http
DELETE /索引名称
```

---

## 💡 最佳实践

### 查询优化建议

1. **使用合适的查询类型**
   - 精确匹配使用 `term` 查询
   - 全文搜索使用 `match` 查询
   - 范围查询使用 `range` 查询

2. **合理使用布尔查询**
   - `must`: 必须匹配（AND 逻辑）
   - `should`: 应该匹配（OR 逻辑）
   - `must_not`: 必须不匹配（NOT 逻辑）

3. **性能考虑**
   - 避免在大量数据上使用通配符查询
   - 合理设置查询的 `size` 参数
   - 使用过滤器（`filter`）而非查询来提高性能

### 删除操作注意事项

1. **备份重要数据** - 删除操作不可逆
2. **测试查询条件** - 先用搜索验证条件是否正确
3. **分批删除** - 大量数据删除时建议分批进行
4. **监控性能** - 删除操作可能影响集群性能

---

## 🔗 相关链接

- [Elasticsearch 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Query DSL 参考](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
- [删除 API 参考](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html)
