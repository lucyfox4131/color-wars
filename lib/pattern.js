const Block = require('../lib/block.js');
const Segment = require('../lib/segment.js');

function Pattern(options = {}){
  this.segmentDatas = options.segments || 0;
  this.segments = this.build();
}

Pattern.prototype.build = function(){
  if (this.segmentDatas){
    var segments = []
    this.segmentDatas.forEach(function(data){
      var seg = new Segment()
      seg.create(data)
      segments.push(seg)
    })
    return segments
  } else {
    return null;
  }
}



module.exports = Pattern;
