import { select,selectAll} from 'd3';
import React, {
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';


export const Sample = (area) => {
  const height = 500
  const width = 500
  const margins = { top: 50, bottom: 0, right: 0, left: 50 }
  const svgRef = useRef();
  useEffect(() => {
    const length=area.area.area.length;
    
    const svg = select(svgRef.current);
    selectAll("#matrix > *").remove();
    svg.append("rect")
      .attr("height",300)
      .attr("width",300)
      .attr("x",100)
      .attr("y",100)
      .attr("stroke","black")
      .attr("fill","white")
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("fill","black")
    .attr("x", width/2)
    .attr("y", 85)
    .text("Samples selected: ");
    const posX=[100,200,300,100,200,300,100,200,300]
    const posY=[100,100,100,200,200,200,300,300,300]
    svg.attr("width", width).attr("height", height)
    console.log(length)
    if(length>=9){
    var pos=0;
    for(var x=0;x<length;x+=parseInt(length/9)+1){
      var url='https://raw.githubusercontent.com/DanishVasdev/DataViz2/main/data'+area.area.area[x]
      svg.append('image')
         .attr('href',url)
         .attr('height',100)
         .attr('width',100)
         .attr('title','image')
         .attr('x',posX[pos])
         .attr('y',posY[pos])
         pos+=1
    }}
    else{
      for(var x=0;x<length;x+=1){
        var url='https://raw.githubusercontent.com/DanishVasdev/DataViz2/main/data'+area.area.area[x]
        const image=svg.append('image')
           .attr('href',url)
           .attr('height',100)
           .attr('width',100)
           .attr('title','image')
           .attr('x',posX[x])
           .attr('y',posY[x])
    }
  }
   })

  return (
    <g>
      <svg ref={svgRef} id= "matrix" transform={`translate(${-300},${margins.left})`}>
      </svg>
    </g>
  )
};


