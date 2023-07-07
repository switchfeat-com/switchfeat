import { FlagModel } from "../models/FlagModel";
import { FlagsItem } from "./FlagsItem";

export const FlagsList: React.FC<{ flags: FlagModel[] }> = (props) => {

   return (<>
      {props.flags.map(flagItem => (
         <FlagsItem flag={flagItem} />
      ))}
   </>);
}