## MongoDB 数据迁移脚本笔记
将`equity`表中`regionId`为`5`的数据的`quoteId`提取出来，并插入到`broker_info_hk`表中，同时添加一些额外的字段。

```javascript
// 连接到MongoDB数据库
use security_master; // 替换为你的数据库名称

// 扫描equity表，获取regionId为5的数据
var equityData = db.equity.find({regionId: 5});

// 遍历查询结果，提取quoteId并插入到broker_info_hk表中
equityData.forEach(function(doc) {
    var quoteId = doc.quoteId; // 提取quoteId
    // 插入到broker_info_hk表中
    db.broker_info_hk.insertOne({
        quoteId: quoteId,
        type: "JP_EQUITY",
        tradingLimitation: NumberInt(1),
        brokerRegionId: 2,
        riskUpdateTime: new ISODate(),
        riskVersion: "2025-08-14",
        createTime: new ISODate(),
        updateTime: new ISODate()
    });
});

print("数据插入完成！");
注意事项
数据库名称：请将security_master替换为你的实际数据库名称。
数据重复性：如果broker_info_hk表中已经存在相同的quoteId，可能会导致重复数据。建议在插入前进行检查，或者在broker_info_hk表上设置唯一索引。
时间字段：ISODate()会自动获取当前时间，确保时间字段的准确性。
性能优化：如果数据量较大，建议分批处理，避免长时间占用数据库资源。
备份数据：在运行脚本之前，建议备份相关数据，以防意外情况导致数据丢失。
权限检查：确保你有足够的权限在目标数据库中执行find和insertOne操作。
 
```

## 修改数据

```
update方法：该方法已被弃用，建议使用新的方法 updateOne()、updateMany() 或者 bulkWrite() 来代替。
db.yourCollectionName.update({}, {$unset: {字段名: ""}},{multi: true});
```

```
updateMany() 是 MongoDB 中的一个方法，用于在集合中更新满足指定条件的多个文档。它的作用类似于 SQL 中的 UPDATE 语句，但可以同时更新多个文档。

以下是 updateMany() 方法的一般语法：
db.collection.updateMany(
   <filter>,   // 过滤条件，确定要更新哪些文档
   <update>,   // 更新操作，指定要对匹配的文档执行的更新操作
   <options>   // 可选参数，用于控制更新行为的其他选项
)
<filter>：这是一个 JSON 对象，用于指定更新操作应该应用于哪些文档。只有满足这个过滤条件的文档才会被更新。
<update>：这也是一个 JSON 对象，用于指定要对满足过滤条件的文档执行的更新操作。常用的更新操作符包括 $set（设置字段的值）、$unset（移除字段）、$inc（增加或减少数值字段的值）等。
<options>：这是一个可选参数，用于控制更新行为的其他选项。常见的选项包括 upsert（如果匹配的文档不存在，则插入新文档）、arrayFilters（用于更新数组字段中的特定元素）等。
// 更新集合中所有年龄大于 30 的文档，将其年龄减少 10
db.users.updateMany({ age: { $gt: 30 } }, { $inc: { age: -10 } })

db.yourCollectionName.updateMany({}, {$unset: {字段名: ""}},{multi: true});
```

## 查询数据

**Long类型数据的查询**  
如果某个字段是Long类型，而不是字符串或其他类型，那么使用正则表达式的方式可能会有一些问题。在这种情况下，你可以使用 MongoDB 的 $gte（大于等于）和 $lt（小于）运算符来查询以xxx开头的字段。
```
db.yourCollectionName.find({
  "字段名": {
    $gte: 400000000,   // 大于等于 4 开头的最小值
    $lt: 500000000     // 小于 5 开头的最大值
  }
})
```

**其他常见查询案例**  

案例一:**查询tableA表的field1字段在tableB表中不存在的记录**  
```
db.tableA.aggregate([
  {
    $match: {
      // 添加其他条件，例如age字段大于等于18
      age: { $gte: 18 },
      // 如果还有其他条件，可以继续在这里添加
    }
  },
  {
    $lookup: {
      from: "tableB",
      localField: "field1",
      foreignField: "field1",
      as: "matched_records"
    }
  },
  {
    $match: {
      matched_records: { $size: 0 } // 找出没有匹配到B表的记录
    }
  },
  {
    $project: {
      _id: 0, // 不显示默认的_id字段
      field1: 1 // 显示eventId字段
      // 在这里可以继续添加其他需要显示的字段
    }
  }
])
localField：表示当前集合（在这里是A表）中的字段，该字段的值将用于与另一个集合中的字段进行匹配。
foreignField：表示另一个集合（在这里是B表）中的字段，将与当前集合中的字段进行匹配。
```

案例二:**从查询的结果中随机返回几条数据**    
```
tb.aggregate([
  {"$match": {"status": 1}},  
  {"$sample": {"size": 50}}
  ]) # 随机返回50条status=1的数据
```