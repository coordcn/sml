# 简单标记语言 SML(Simple Markup Language)

## 简单高效的模板标记语言（设计哲学，不增加学习成本，不引入新的复杂度，够用就行）

### 简单
模板支持tag、attribute、text、comment、doctype、code六大类标记。
实现参考了jade，在jade的基础上做了简化，功能不如jade强大，但是学习成本低得多。

####转义内部变量 \#{name}

####转义外部变量 \#{it.name}

####非转义内部变量 !{name}

####非转义外部变量 !{it.name} 

####doctype

    !doctype
  
    !doctype html
  
    !doctype custem value

####tag(attributes)

    !a 这是一个链接
  
    !a(id="a" class='b' disabled) 这仍然是个链接
  
    \- var cls = 'cls';

    !a(id="#{it.id}" class='!{cls}') 这还是一个链接
  
####text
    !p 这里可以是文字，#{it.content1}这里是转义替换文本。
  
    新起一行，加两个空格这又是一行文本。
    
    !{it.content2}这里是非转义替换文本。

####comment 只支持行注释，以//开头都视为注释

####code 全部为javascript原生代码，以-开头的行都视为代码行。代码的正确性自行保证。
    \- var name = value;
  


### 高效
所有模板预编译成javascript代码，代码运行效率高于haml、Jade、ejs，与doT、jst相当。
[性能测试参考实现](https://cnodejs.org/topic/4f16442ccae1f4aa27001109)
