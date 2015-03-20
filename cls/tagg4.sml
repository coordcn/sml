- extends ./tagg3.sml   
    - block switch
      !div(id="switch") code test switch
        - switch(it.switch)
          - case 0:
          - case 1:
          - case 3:
            !p 这里是switch测试 0 1 3
          - default:
            !p 这里是switch测试 default