import { useParams, Navigate } from 'react-router-dom';
import FlagGame from './games/FlagGame';
import CapitalGame from './games/CapitalGame';
import LandmarkGame from './games/LandmarkGame';
import ClimateGame from './games/ClimateGame';
import ContinentRushGame from './games/ContinentRushGame';
import FindCountryGame from './games/FindCountryGame';
import UzbekistanRegionsGame from './games/UzbekistanRegionsGame';
import RiverChallengeGame from './games/RiverChallengeGame';

const registry = {
  flag: FlagGame,
  capital: CapitalGame,
  landmark: LandmarkGame,
  climate: ClimateGame,
  continentRush: ContinentRushGame,
  findCountry: FindCountryGame,
  uzbRegions: UzbekistanRegionsGame,
  river: RiverChallengeGame,
};

export default function GamePlay() {
  const { slug } = useParams();
  const GameComponent = registry[slug];
  if (!GameComponent) return <Navigate to="/games" replace />;
  return <GameComponent key={slug} />;
}
