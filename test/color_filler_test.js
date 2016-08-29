const chai = require('chai');
const assert = chai.assert;

// const Block = require('../lib/block.js');
const Segment = require('../lib/segment.js');
const Pattern = require('../lib/pattern.js');
const ColorFiller = require('../lib/color_filler.js');

describe("Color Filler", function(){
  context("has the correct attributes given a current block", function(){
    var options = {length: 3, startX: 10, startY: 10, orientation: "horizontal"};
    var segment = new Segment();
    segment.create(options);
    var blocks = segment.allBlocks();

    it("with a parent and a child", function(){
      var parent = blocks[0];
      var block = blocks[1];
      var child = blocks[2];
      var filler = new ColorFiller(block);
      assert.equal(filler.parent, parent);
      assert.equal(filler.child, child);
    });

    it("without a parent, but with a child (head)", function(){
      var block = blocks[0];
      var child = blocks[1];
      var filler = new ColorFiller(block);
      assert.equal(filler.child, child);
      assert.equal(filler.parent, null);
    });

    it("with a parent, but without a child (end)", function(){
      var block = blocks[2];
      var parent = blocks[1];
      var filler = new ColorFiller(block);
      assert.equal(filler.parent, parent);
      assert.equal(filler.child, null);
    });
  });

  context("can determine if a neighbor is grey", function(){
    var options = {length: 3, startX: 10, startY: 10, orientation: "horizontal"};
    var segment = new Segment();
    segment.create(options);
    var blocks = segment.allBlocks();

    it("with a grey parent", function(){
      var block = blocks[1];
      var parent = blocks[0];
      var filler = new ColorFiller(block);
      assert.equal(filler.currentGreyParent, true);
      filler = new ColorFiller(parent);
      assert.notEqual(filler.currentGreyParent, true);
    });

    it("with a grey child", function(){
      var block = blocks[1];
      var child = blocks[2];
      var filler = new ColorFiller(block);
      assert.equal(filler.currentGreyChild, true);
      filler = new ColorFiller(child);
      assert.notEqual(filler.currentGreyChild, true);
    });
  });

  context("can determine if a block is a current connection", function(){
    var optionsOne = {length: 3, startX: 10, startY: 10, orientation: "horizontal"};
    var optionsTwo = {length: 3, startX: 10, startY: 10, orientation: "vertical"};
    var connection = {x: 10, y:10}
    var options = {segments: [optionsOne, optionsTwo], connections: [connection]};
    var pattern = new Pattern(options);
    var segments = pattern.segments;
    it("returns true if the block is a current connection", function(){
      var block = segments[0].head;
      var filler = new ColorFiller(block, pattern);
      assert.equal(filler.currentConnection, true);
    });
  });
});
