# es常见用法


## 查询数据
### 指定字段查询

#### match查询：

用于全文本搜索，可以用于字符串字段。
它会对输入的文本进行分词，生成词条，然后匹配文档中包含这些词条的情况。
适用于自然语言查询，会考虑词汇和语法，以更灵活地匹配文本。
term查询：

用于精确匹配，通常用于关键字字段或不需要分词的字段。
它不会分析输入的文本，而是直接将整个输入作为一个词条与文档中的字段进行匹配。
适用于需要精确匹配的情况，例如数字、日期或关键字。

```
GET /es索引名称/_doc/_search
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


###  模糊查询
注意：Can only use prefix queries on keyword, text and wildcard fields - not on [xxx field] which is of type [integer]

#### 单字段模糊查询
```
GET /es索引名称/_search
{
  "query": {
    "prefix": {
      "isin": "US7452"
    }
  }
}
```


#### 多个字段结合的模糊查询
```
GET /es索引名称/_search
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

 
## 删除数据
### 按ID(_id)删除单个文档
```
DELETE /es索引名称/_doc/es里面某条记录对应的_id字段
```

### 按查询条件删除多个文档
```
POST /es索引名称/_delete_by_query
{
  "query": {
    "term": {
      "field_name": "value_to_match"
    }
  }
}

```
