import { select, brushSelection, brush, interpolateMagma} from 'd3';
import { range, scaleBand, axisTop, axisLeft,scaleLinear } from 'd3';
import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { Sample } from './sample';

export const Graph = (data) => {
  const height = 500
  const width = 500
  const margins = { top: 50, bottom: 0, right: 0, left: 50 }
  const xScale = scaleBand()
    .domain(range(-90, 91,10))
    .range([45, width+5])
  const xScale2 = scaleBand()
    .domain(range(-90, 90))
    .range([margins.left, width - margins.right])
  const xScale3 =scaleLinear()
                 .domain(range(0,100))
                 .range(range(0,400,4))
  const yScale = scaleBand()
    .domain(range(0, 361,30))
    .range([35,height+15])
  const yScale2 = scaleBand()
    .domain(range(0, 360))
    .range([margins.left, width - margins.right])
  const colorScale= scaleLinear()
                    .domain([0,100])
                    .range([0,1])
  const scl=range(0,100);
  const [area, setArea] = useState({ area: [] });
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.attr("width", width).attr("height", height)
    svg.call(brush().extent([[0, 0], [width, height]])
      .on("end", () => { setArea({ area: updateChange(svg) }) }))
    const axisX = svg.append('g')
      .attr('transform', "translate(0, 45)")
    // 
    axisX.call(axisTop(xScale))
    const axisY = svg.append('g')
      .attr('transform', "translate(45, 0)")
    axisY.call(axisLeft(yScale))
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("fill","black")
    .attr("x", width/2)
    .attr("y", 15)
    .text("phi");
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("fill","black")
    .attr("x", -250)
    .attr("y", 8)
    .attr("transform", "rotate(-90)")
    .text("theta")
    
  })
  const svgRef2= useRef();
  useEffect(()=>{
    const svg= select(svgRef2.current);
    svg.attr("width",401).attr("height",40)
  })
  function updateChange(svg) {
    var extent = brushSelection(svg.node())
    const area=[]
    data.data.filter((d)=>((xScale2(d.phi)<extent[1][0]&&xScale2(d.phi)>extent[0][0])&&(yScale2(d.theta)>extent[0][1]&&yScale2(d.theta)<extent[1][1]))).map((d)=>{
        area.push(d.FILE1);
    })
    return area
  }
  function tick(d){
    if(d%10===0){
      return `${d}`;
    }
    else{
      return '';
    }
  }
  return (
    <g>
      <svg ref={svgRef} transform={`translate(${margins.left},${margins.top})`}>
         {data.data.map((d)=>(
          <rect key={d.sample_id}
          height={7} width={10} x={xScale2(d.phi)} y={yScale2(d.theta)} fill={interpolateMagma(colorScale(d.Uncertainty))}></rect>
         ))}
      </svg>
      <svg ref={svgRef2} transform={`translate(${-400},${-450})`}>
        {scl.map((d)=>(
          <g>
          <text x={xScale3(d)} y={30} fill={"black"}>{tick(d)}</text>
          <rect key={d}
          height={20} width={4}
          x={xScale3(d)} fill={interpolateMagma(colorScale(d))}></rect>
          </g>
        ))}
      </svg>
      <Sample area={area}></Sample>
    </g>
  )
};
