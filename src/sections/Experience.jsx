// "use client";

import { Timeline } from "../components/Timeline";
import { achievements } from "../constants";

const Experience=()=>{
  return (
    <div className="w-full" id="achievements">
  <Timeline data={achievements} />
</div>
  )
}

export default Experience;