const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/block.js');
const Segment = require('../lib/segment.js');
const Pattern = require('../lib/pattern.js');
const ColorFiller = require('../lib/color_filler.js');

describe("Color Filler", function(){
  context("has the correct attributes given a current block", function(){
    var options = {length: 3, startX: 10, startY: 10, orientation: "horizontal"}
    var segment = new Segment()
    segment.create(options)
    var blocks = segment.allBlocks()

    it("with a parent and a child", function(){
      var parent = blocks[0]
      var block = blocks[1]
      var child = blocks[2]
      var filler = new ColorFiller(block)
      assert.equal(filler.parent, parent)
      assert.equal(filler.child, child)
    })

    it("without a parent, but with a child (head)", function(){
      var block = blocks[0]
      var child = blocks[1]
      var filler = new ColorFiller(block)
      assert.equal(filler.child, child)
      assert.equal(filler.parent, null)
    })

    it("with a parent, but without a child (end)", function(){
      var block = blocks[2]
      var parent = blocks[1]
      var filler = new ColorFiller(block)
      assert.equal(filler.parent, parent)
      assert.equal(filler.child, null)
    })
  })

  context("can determing if a neighbor is grey", function(){
    var options = {length: 3, startX: 10, startY: 10, orientation: "horizontal"}
    var segment = new Segment()
    segment.create(options)
    var blocks = segment.allBlocks()

    it("with a grey parent", function(){
      var block = blocks[1]
      var parent = blocks[0]
      assert.equal(currentGreyNeighbor(parent), true)
    })

    it("with a grey child", function(){
      var block = blocks[1]
      var parent = blocks[2]
      assert.equal(currentGreyNeighbor(child), true)
    })
  })
})
