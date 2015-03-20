- extends ./tagg2.sml   
    
    - block forin
      !div(id="forin") code test for in
        - var forin = it.forin;
        !ul
          - for(var name in forin)
            !li 名称：!{name}   值：!{forin[name]}
