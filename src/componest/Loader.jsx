//? IMPORTACION DEL LOADER.
// import { Ping } from "@uiball/loaders";
import { MrMiyagi } from "@uiball/loaders";

export const Loader = () => {
  return (
    <div className="container-loader">
      <MrMiyagi size={50} lineWeight={3.5} speed={1} color="black" />
    </div>
  );
};
