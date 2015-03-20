- extends ./tagg1.sml   
    
    - block if   
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
  