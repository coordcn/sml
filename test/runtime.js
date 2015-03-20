var rt = require('../lib/runtime');
var assert = require('assert');

describe('runtime.extend(child, parent)', function(){
  it('runtime.extend(child, parent)', function(){
    function Animal(name, gender){
      this.name = name;
      this.gender = gender;
    }
    
    Animal.prototype.cry = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'cry',
        prey: this.prey
      };
    };
    
    function Felid(name, gender, prey){
      Felid._super(this, name, gender);
      this.prey = prey;
    }
    
    Felid.prototype.hunt = function(){
      return {
        name : this.name,
        gender: this.gender,
        action: 'hunt',
        prey: this.prey
      };
    };
    
    Felid.prototype.cry = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'cry',
        prey: this.prey
      };
    }
    
    rt.extend(Felid, Animal);
    
    function Felid1(name, gender, prey){
      this.prey = prey;
    }
    
    Felid1.prototype.hunt = function(){
      return {
        name : this.name,
        gender: this.gender,
        action: 'hunt',
        prey: this.prey
      };
    };
    
    Felid1.prototype.cry = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'cry',
        prey: this.prey
      };
    }
    
    rt.extend(Felid1, Animal);
    
    function Cat(prey, shape, name, gender){
      Cat._super(this, name, gender, prey);
      this.shape = shape;
    }
    
    rt.extend(Cat, Felid);
    
    Cat.prototype.hunt = function(){
      return {
        name : this.name,
        gender: this.gender,
        action: 'hunt',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    Cat.prototype.cry = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'cry',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    Cat.prototype.run = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'run',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    function Cat1(prey, shape, name, gender){
      Cat1._super(this, name, gender, prey);
      this.shape = shape;
    }
    
    rt.extend(Cat1, Felid1);
    
    Cat1.prototype.hunt = function(){
      return {
        name : this.name,
        gender: this.gender,
        action: 'hunt',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    Cat1.prototype.cry = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'cry',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    Cat1.prototype.run = function(){
      return {
        name: this.name,
        gender: this.gender,
        action: 'run',
        prey: this.prey,
        shape: this.shape
      };
    };
    
    var animal = new Animal('animal', 'female');
    var res = animal.cry();
    assert.ok(res.name === 'animal');
    assert.ok(res.gender === 'female');
    assert.ok(res.action === 'cry');
    assert.ok(animal.constructor === Animal);
    
    var felid = new Felid('felid', 'male', 'meet');
    var res1 = felid.cry();
    var res2 = felid.hunt();
    assert.ok(res1.name === 'felid');
    assert.ok(res1.gender === 'male');
    assert.ok(res1.action === 'cry');
    assert.ok(res1.prey === 'meet');
    assert.ok(res2.name === 'felid');
    assert.ok(res2.gender === 'male');
    assert.ok(res2.action === 'hunt');
    assert.ok(res2.prey === 'meet');
    assert.ok(Animal.prototype.constructor === Animal);
    assert.ok(Felid.prototype.constructor === Felid);
    assert.ok(felid.constructor === Felid);
    
    var felid1 = new Felid1('felid', 'male', 'meet');
    var res11 = felid1.cry();
    var res21 = felid1.hunt();
    assert.ok(res11.name === undefined);
    assert.ok(res11.gender === undefined);
    assert.ok(res11.action === 'cry');
    assert.ok(res11.prey === 'meet');
    assert.ok(res21.name === undefined);
    assert.ok(res21.gender === undefined);
    assert.ok(res21.action === 'hunt');
    assert.ok(res21.prey === 'meet');
    assert.ok(Animal.prototype.constructor === Animal);
    assert.ok(Felid1.prototype.constructor === Felid1);
    assert.ok(felid1.constructor === Felid1);

    var cat = new Cat('mouse', 'small', 'cat', 'male');
    var res111 = cat.cry();
    var res211 = cat.hunt();
    var res311 = cat.run();
    assert.ok(res111.name === 'cat');
    assert.ok(res111.gender === 'male');
    assert.ok(res111.action === 'cry');
    assert.ok(res111.prey === 'mouse');
    assert.ok(res111.shape === 'small');
    assert.ok(res211.name === 'cat');
    assert.ok(res211.gender === 'male');
    assert.ok(res211.action === 'hunt');
    assert.ok(res211.prey === 'mouse');
    assert.ok(res211.shape === 'small');
    assert.ok(res311.name === 'cat');
    assert.ok(res311.gender === 'male');
    assert.ok(res311.action === 'run');
    assert.ok(res311.prey === 'mouse');
    assert.ok(res311.shape === 'small');
    assert.ok(Animal.prototype.constructor === Animal);
    assert.ok(Cat.prototype.constructor === Cat);
    assert.ok(cat.constructor === Cat);
    
    var cat1 = new Cat1('mouse', 'small', 'cat', 'male');
    var res1111 = cat1.cry();
    var res2111 = cat1.hunt();
    var res3111 = cat1.run();
    assert.ok(res1111.name === undefined);
    assert.ok(res1111.gender === undefined);
    assert.ok(res1111.action === 'cry');
    assert.ok(res1111.prey === 'mouse');
    assert.ok(res1111.shape === 'small');
    assert.ok(res2111.name === undefined);
    assert.ok(res2111.gender === undefined);
    assert.ok(res2111.action === 'hunt');
    assert.ok(res2111.prey === 'mouse');
    assert.ok(res2111.shape === 'small');
    assert.ok(res3111.name === undefined);
    assert.ok(res3111.gender === undefined);
    assert.ok(res3111.action === 'run');
    assert.ok(res3111.prey === 'mouse');
    assert.ok(res3111.shape === 'small');
    assert.ok(Animal.prototype.constructor === Animal);
    assert.ok(Cat1.prototype.constructor === Cat1);
    assert.ok(cat1.constructor === Cat1);
  });
});