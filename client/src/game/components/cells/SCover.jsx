import { useAdventureContext } from "../../context/AdventureContext";

export default function SCover() {
  const { mapSkin } = useAdventureContext();
  return <img src={mapSkin.cover} alt='' />;
}
