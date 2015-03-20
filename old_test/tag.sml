!doctype html

!html
  !head
  
    // comment
    !title !{it.title}
    !meta(charset="utf-8")
    - var css = 'style.css';
    - var js = 'main.js';
    //非转义内部变量 !{css}
    !link(href="!{css}" type="text/css" rel="stylesheet")
    
    //   转义内部变量 #{js}
    - js = 'part.js';
    !script(href="#{js}" type="text/javascript")
  !body
    !div(class="cls")
      !p 这里是外部变量无转义测试 !{it.unescaped} 测试的屁股
      !p 这里是外部变量转义测试 #{it.escaped} 
      !p !{it.unescaped}
      !p #{it.escaped}
      !p 这里是文本测试
      
        我们这么大的国家，这么众多的人口，是不可能依附其他国家生存的。
        那些妄想可以通过外部力量来实现自己利益的人，必将输掉全部。
        很多人已经印证了这点，很多国家已经印证了这点。
        
        我们维护这个国家的利益，其实就是维护自己的利益。
        当国家混乱的时候，个人怎么可能独善其身？
        爱国者不仅仅是理想主义者，更是彻头彻尾的现实主义者，因为我们清楚的知道自身的利益所在。
        国家命运和个人命运其实是一体的。

        推荐好文
        !a(href="http://blog.sina.com.cn/s/blog_48a082b70101bkcw.html") 《不要辜负我们的时代》
        !a(href="http://blog.sina.com.cn/s/blog_48a082b70101hevy.html") 《少年，你真的了解这个国家吗？》
        !a(href="http://tieba.baidu.com/p/1521337772") 《我们的征途是星辰大海》
          !span 在任何时候，我们都不应该辜负这个国家，这个民族，这个时代。实现国家民族的复兴，这是我们与生俱来的历史使命，我们责无旁贷。
      !p
        !span
          !span
            !span
              !span
                !span
                  !span 够深吧，这也是个测试
                  
                  
                  
            
            
            
            // 其实上面的空行也是测试 里面是有玄机的 主要测试空行不按照缩进来写的后果 后果很严重
         // 这一行是注释的测试 注释和空行可以不严格按照缩进来写 
       // 这一行是注释的测试 注释和空行可以不严格按照缩进来写 
            
         
         
    !div(id="id" class="cls") Code test for
      - var users = it.users;
      - if(users && users.length)
        !table
          - for(var i = 0, l = users.length; i < l; i++)
            - var user = users[i];
            !tr
              !td 名字：!{user.name}
                ！这是一名神奇的少年
                ！这其实是一个测试
              !td 年龄：!{user.age}
                ！这是一名神奇的少年
                ！这其实是一个测试
                中国的惊叹号和外国的是不一样的。
    !div (id="if")code test if
      -var ifcase = it.deep0.deep1.deep2.ifcase;
      - var elseifcase0 = it[elseifcase0];
      - var ifresult = it.ifresult;
      - var elseifresult0 = it.elseifresult0;
      - if(ifcase)
        !p !{ifresult} 我是if的结果
          这里再弄点文字什么的
          这其实还是一个测试
        !div div也是可以的吧
      - else if(elseifcase0)
        !p 这是一个转义的结果 #{elseifresult0} 我们来让结果转个义
      - else if(it.elseifcase1)
        !p 这是是没有转义的结果 !{elseifresult0} 我们来不让结果转个义
      - else
        !p 终于到else 请大家注意，javascript语法的正确性保证要靠自己，所有语句将原封不动的替换到编译后的函数中去
    !div(id="forin") code test for in
      - var forin = it.forin;
      !ul
        - for(var name in forin)
          !li 名称：!{name}   值：!{forin[name]}
    !div(id="while") code test while
      - var i = 0;
      - while(i < it.whilecase.length)
        !p 这里是while测试 !{it.whilecase[i].name}这里是while测试的年龄 !{it.whilecase[i].age} 
        - i++;
    !div(id="switch") code test switch
      - switch(it.switch)
        - case 0:
        - case 1:
        - case 3:
          !p 这里是switch测试 0 1 3
        - default:
          !p 这里是switch测试 default
          
        
      