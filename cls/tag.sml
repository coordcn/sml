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
            
         
    - block for    
      !div(id="id" class="cls") Code test for
      
    - block if   
      !div (id="if")code test if
    - block forin
      !div(id="forin") code test for in

    - block while
      !div(id="while") code test while
        - var i = 0;
        - while(i < it.whilecase.length)
          !p 这里是while测试 !{it.whilecase[i].name}这里是while测试的年龄 !{it.whilecase[i].age} 
          - i++;
    - block switch
      !div(id="switch") code test switch

          
        
      