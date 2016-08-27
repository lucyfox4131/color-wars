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

  context("can create a new horizontal segment", function(){
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
      var child = segment.head.child
      assert.equal(child.parent, segment.head)
      assert.equal(segment.head.child.x, 20)
      assert.equal(segment.head.child.y, 10)
      // assert.equal(segment.allBlocks().length, 2)
    })
  });

  context("can create a new vertical segment", function(){
    it ("with one block", function(){
      var segment = new Segment()
      var options = {length: 1, startX: 10, startY: 10, orientation: "vertical"}
      segment.create(options)

      assert.equal(segment.length, 1)
      assert.equal(segment.head.x, 10)
      assert.equal(segment.head.y, 10)
      assert.equal(segment.orientation, "vertical")
    })

    it ("with two blocks", function(){
      var segment = new Segment()
      var options = {length: 2, startX: 10, startY: 10, orientation: "vertical"}
      segment.create(options)

      assert.equal(segment.length, 2)
      assert.equal(segment.head.x, 10)
      assert.equal(segment.head.y, 10)
      assert.equal(segment.orientation, "vertical")
      assert.equal(segment.head.child.x, 10)
      assert.equal(segment.head.child.y, 20)
      var child = segment.head.child
      assert.equal(child.parent, segment.head)
    })
  })

  context("can give all blocks in segment", function(){
    it("returns an array of blocks", function(){
      var segment = new Segment()
      var options = {length: 2, startX: 10, startY: 10, orientation: "horizontal"}
      segment.create(options)

      var blocks = segment.allBlocks();
      assert.equal(blocks.length, 2)
      assert.equal(blocks[0].x, 10)
      assert.equal(blocks[1].x, 20)
    })
  })
})
