const chai = require('chai');
const assert = chai.assert;

const Pattern = require('../lib/pattern.js');
const ColorFiller = require('../lib/color_filler.js');

describe("Color Filler", function(){
  context("has the correct attributes", function(){
    var optionsOne = {length: 3, startX: 10, startY: 10, orientation: "horizontal"};
    var optionsTwo = {length: 3, startX: 10, startY: 10, orientation: "vertical"};
    var connection = {x: 10, y:10};
    var options = {segments: [optionsOne, optionsTwo], connections: [connection]};
    var pattern = new Pattern(options);
    var segments = pattern.segments;
    var block = segments[0].head;
    var filler = new ColorFiller(block, pattern);

    it("with a pattern", function(){
      assert.equal(filler.pattern, pattern);
    });

    it("with a current block", function(){
      assert.equal(filler.currentBlock, block);
    });
  });

  context("can handle connections", function(){
    var optionsOne = {length: 3, startX: 10, startY: 10, orientation: "horizontal"};
    var optionsTwo = {length: 3, startX: 10, startY: 10, orientation: "vertical"};
    var connection = {x: 10, y:10};
    var options = {segments: [optionsOne, optionsTwo], connections: [connection]};
    var pattern = new Pattern(options);
    var segments = pattern.segments;
    var block = segments[0].head;
    var filler = new ColorFiller(block, pattern);

    it("by determining if a block is a connection", function(){
      assert.equal(filler.isCurrentConnection(block, pattern), true);
    });

    it("by returning all the copies of a block for a given connection", function(){
      var blockOne = block;
      var blockDouble = segments[1].head;
      assert.deepEqual(filler.eachConnectionBlock(block, pattern), [blockOne, blockDouble]);
    });
  });
});
