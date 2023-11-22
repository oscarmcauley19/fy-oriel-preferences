import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSimulationResults } from "../lib/simulation";
import { getOptions } from "../lib/rankingOptions";
import { DetailedSimulationResult, SimulationResults } from "../models/simultation";
import { DeaneryModel } from "../models/deanery";
import { DndProvider } from "react-dnd";
import SortableList from "./SortableList";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function RunPage() {
   const [deaneries, setDeaneries] = useState<DeaneryModel[]>([]);
   const [response, setResponse] = useState<DetailedSimulationResult[]>([]);
   const [ranking, setRanking] = useState<DeaneryModel[]>([]);

   useEffect(() => {
      getOptions().then((options) => options && setDeaneries(options));
   }, [])

   const handleClick = async () => {
      const runs = 20;
      if (ranking) {
         const ids = ranking.map((opt) => opt.id)
         const simResults: SimulationResults | null = await getSimulationResults(ids);
         if (simResults) {
            const ids: string[] = Object.keys(simResults);
            const detailedResults: DetailedSimulationResult[] = ids.map((id: string) => {
               const intId: number = parseInt(id);
               return { id: intId, name: deaneries[intId].name, chance: simResults[intId] / runs };
            });
            setResponse(detailedResults);
         }
      }
   }

   return (
      <>
         <Button onClick={handleClick}>Perform Simulation</Button>
         {
            response.map((deaneryResult) => 
               <Typography key={deaneryResult.name}>{deaneryResult.name}: {deaneryResult.chance}</Typography>
            )
         }
         {
            ranking &&
            <DndProvider backend={HTML5Backend}>
               <SortableList ranking={ranking} setRanking={setRanking}/>
            </DndProvider>
         }
      </>
   );
}