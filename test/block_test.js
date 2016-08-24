const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/block.js');

describe('Block', function(){
  context('with default attributes', function(){
    var cell = new Block({});

    it('should have an x value', function(){
      assert.equal(cell.x, 0);
    });

    it('should have a y value', function(){
      assert.equal(cell.y, 0);
    });

    it('should have a width value', function(){
      assert.equal(cell.width, 10);
    });

    it('should have a height value', function(){
      assert.equal(cell.height, 10);
    });

    it('should have a default shape value of false', function(){
      assert.equal(cell.color, "grey");
    });
  });

  context('with given attributes', function(){
    var block = new Block({x: 10, y: 10, width: 40, height: 40, color: "blue"});

    it('should have an x value', function(){
      assert.equal(block.x, 10);
      assert.equal(block.y, 10);
      assert.equal(block.width, 40);
      assert.equal(block.height, 40);
      assert.equal(block.color, "blue");
    });
  })

  context('with some attributes given', function(){
    var block = new Block({x: 10, y: 10, width: 40});

    it('should have an x value', function(){
      assert.equal(block.x, 10);
      assert.equal(block.y, 10);
      assert.equal(block.width, 40);
      assert.equal(block.height, 10);
      assert.equal(block.color, "grey");
    });
  });

  context('can change a blocks color', function(){
    var block = new Block();

    it('should have default grey', function(){
      assert.equal(block.color, "grey");
    });

    it('should be blue if color is changed', function(){
      block.color = "blue";
      assert.equal(block.color, "blue");
    });
  });

  context('knows its coordinates', function(){
    var block = new Block({x: 10, y: 10, width: 1, height: 1});
    var coordinates = block.coordinates();

    it('should return a single coordinates', function(){
      assert.equal(coordinates.length, 4);
    })

    it('should return correct coordinates', function(){
      assert.deepEqual(coordinates, [{x: 10, y: 10}, {x: 10, y: 11}, {x: 11, y: 10}, {x: 11, y: 11}])
    });
  });
});
