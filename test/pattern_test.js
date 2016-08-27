const chai = require('chai');
const assert = chai.assert;

const Segment = require('../lib/segment.js');
const Block = require('../lib/block.js');
const Pattern = require('../lib/pattern.js');

describe("Pattern", function(){
  context("with default attributes", function(){
    it("has no segment data", function(){
      var pattern = new Pattern()
      assert.equal(pattern.segmentDatas, 0)
    })
    it("has no segments", function(){
      var pattern = new Pattern()
      assert.deepEqual(pattern.segments, null)
    })
  })

  context("takes in information to build segments", function(){
    it("and builds the segments", function(){
      var segmentOne = {startX: 10, startY:10, length: 5, orientation: "horizontal"}
      var segmentTwo = {startX: 10, startY:10, length: 5, orientation: "vertical"}
      var options = {segments: [segmentOne, segmentTwo] }
      var pattern = new Pattern(options)
      assert.deepEqual(pattern.segmentDatas, [segmentOne, segmentTwo])
      pattern.build()
      assert.deepEqual(pattern.segments.length, 2)
      var segOne = pattern.segments[0]
      assert(segOne.head instanceof Block)
    })

  })
})
