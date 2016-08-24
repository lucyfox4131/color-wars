const chai = require('chai');
const assert = chai.assert;

const Segment = require('../lib/segment.js');
const Block = require('../lib/block.js');

describe('Segment', function(){
  context("has default attributes", function(){
    var segment = new Segment()
    it("has a default length of zero", function(){
      assert.equal(segment.length, 0)
    })

    it("has a default head position of 0,0", function(){
      assert.equal(segment.head, null)
    })

    it("has a default orientation of null", function(){
      assert.equal(segment.orientation, null)
    })
  });

  context("can create a new segment", function(){
    it("with one block", function(){
      var segment = new Segment()
      var options = {length: 1, startX: 10, startY: 10}
      segment.create(options)

      assert.equal(segment.length, 1)
      assert(segment.head instanceof Block)
      assert.equal(segment.head.x, 10)
      assert.equal(segment.head.y, 10)
    })

    it("with 2 blocks", function(){
      var segment = new Segment()
      var options = {length: 2, startX: 10, startY: 10, orientation: "horizontal"}
      segment.create(options)

      assert.equal(segment.length, 2)
      assert.equal(segment.head.x, 10)
      assert.equal(segment.head.y, 10)
      assert.equal(segment.orientation, "horizontal")
      assert.equal(segment.head.child.x, 20)
      assert.equal(segment.head.child.y, 10)
      // assert.equal(segment.allBlocks().length, 2)
    })
  })
})
