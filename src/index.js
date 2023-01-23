import React, {
  useState,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { Graph } from './Graph';
import {csv} from 'd3';
const uncertainity='https://gist.githubusercontent.com/DanishVasdev/e99813096c69d10195a9f78c74b6c0cf/raw/uncertainity.csv'
const App = () => {
  const [data, setData] = useState(null);
   useEffect(() => {
    const parse=(data)=>{
      data.sample_id=+data.sample_id
      data.phi=parseFloat(data.phi)
      data.theta=parseFloat(data.theta)
      data.Uncertainty=parseFloat(data.Uncertainty)
      return(data);
    }
    csv(uncertainity,parse).then(setData);
   }, []);
   if (!data) {
    return <pre>Loading...</pre>;
  }
    return(
      <g>
      <h1>Visualizing Uncertainity</h1>
      <Graph data={data}></Graph>
      </g>
    )         
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

