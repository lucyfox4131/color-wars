const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/block.js');
const Pattern = require('../lib/pattern.js');

describe("Pattern", function(){
  context("with default attributes", function(){
    it("has no segment data", function(){
      var pattern = new Pattern();
      assert.equal(pattern.segmentDatas, 0);
    });
    it("has no segments", function(){
      var pattern = new Pattern();
      assert.deepEqual(pattern.segments, null);
    });
  });

  context("takes in information to build segments", function(){
    it("and builds the segments", function(){
      var segmentOne = {startX: 10, startY:10, length: 5, orientation: "horizontal"};
      var segmentTwo = {startX: 10, startY:10, length: 5, orientation: "vertical"};
      var connections = [{x: 10, y: 10}];
      var options = {segments: [segmentOne, segmentTwo], connections: connections };
      var pattern = new Pattern(options);
      assert.deepEqual(pattern.segmentDatas, [segmentOne, segmentTwo]);
      pattern.build();
      assert.deepEqual(pattern.segments.length, 2);
      var segOne = pattern.segments[0];
      assert(segOne.head instanceof Block);
      assert.deepEqual(pattern.connections, [{x: 10, y: 10}]);
    });

    context("randomly places computer colors on the pattern", function(){
      it("changes the color of the selected computer blocks", function(){
        var segmentOne = {startX: 10, startY:10, length: 2, orientation: "horizontal"};
        var segmentTwo = {startX: 10, startY:10, length: 2, orientation: "vertical"};
        var connections = [{x: 10, y: 10}];
        var options = {segments: [segmentOne, segmentTwo], connections: connections };
        var pattern = new Pattern(options);
        var blocks = pattern.blocks();
        var compColors = ["blue", "magenta"];
        var compBlocks = pattern.placeCompBlocks(blocks, compColors);

        compBlocks.forEach(function(block){
          assert(block.color !== "grey");
        });

      // it("does not place comp blocks in the same square", function(){
      //   var segmentOne = {startX: 10, startY:10, length: 1, orientation: "horizontal"};
      //   var segmentTwo = {startX: 10, startY:10, length: 1, orientation: "vertical"};
      //   var connections = [{x: 10, y: 10}];
      //   var options = {segments: [segmentOne, segmentTwo], connections: connections };
      //   var pattern = new Pattern(options);
      //   var blocks = pattern.blocks();
      //   var compColors = ["blue", "magenta"];
      //   var compBlocks = pattern.placeCompBlocks(blocks, compColors);
      //
      //
      // })
      });
    });
  });
});
