**[一篇文章为你揭秘pytest的基本用法](https://mp.weixin.qq.com/s/6rzVPnD0FcJo-4F22qkqvQ)**

## pytest-assume
**pytest-assume:[pytest多重断言插件-pytest-assume](https://mp.weixin.qq.com/s/dtAb1x2YTFSMGYTTAIO-9w)** 

## 自定义异常信息
在assert后面加上逗号后，在第二个参数的位置写上自定义断言的内容

```
def test_example():
    a = 1
    b = 2

    assert a == b, f"{a} 与 {b}不相等"
```

## 代码异常逻辑处理-忽略异常

```
import pytest


def test_divide():
    with pytest.raises(Exception):
        a = 1 / 5
        assert 1 == 3   # with pytest.raises里面的断言不会被执行
        print(123)  #不会执行到这里，不会打印
    assert 1 == 9 # 这里的断言会被执行
```