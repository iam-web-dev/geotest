import { useParams, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import SEO from '../components/SEO';

const registry = {
  flag: lazy(() => import('./games/FlagGame')),
  capital: lazy(() => import('./games/CapitalGame')),
  landmark: lazy(() => import('./games/LandmarkGame')),
  climate: lazy(() => import('./games/ClimateGame')),
  continentRush: lazy(() => import('./games/ContinentRushGame')),
  findCountry: lazy(() => import('./games/FindCountryGame')),
  uzbRegions: lazy(() => import('./games/UzbekistanRegionsGame')),
  river: lazy(() => import('./games/RiverChallengeGame')),
  mountainCountry: lazy(() => import('./games/MountainCountryGame')),
};

const gameMeta = {
  flag:          { title: 'Bayroqni Bil',              desc: "Dunyo davlatlarining bayroqlarini taxmin qiling va geografiya bilimlaringizni sinab köring." },
  capital:       { title: 'Poytaxtni Top',             desc: "Davlatlar poytaxtlarini toping — interaktiv va qiziqarli geografiya öyini." },
  landmark:      { title: 'Maşhur Joylar',            desc: "Dunyo böylab maşhur tarixiy va geografik yodgorliklarni toping." },
  climate:       { title: 'Iqlimni Aniqlang',          desc: "Dunyo iqlim mintaqalari va ob-havosi haqida bilimlaringizni sinab köring." },
  continentRush: { title: "Qit'ani Toping",            desc: "Qit'alarni tez aniqlang — vaqt çeklangan tezlik öyini." },
  findCountry:   { title: 'Xaritada Davlat',           desc: "Interaktiv dunyo xaritasida berilgan davlatni toping." },
  uzbRegions:    { title: "Özbekiston Viloyatlari",   desc: "Özbekiston viloyatlarini xaritada toping va ularga oid savollarni javoblang." },
  river:         { title: "Daryolarni Bil",            desc: "Dunyo va Markaziy Osiyo daryolarini xaritada toping va aniqlang." },
  mountainCountry: { title: "Toğ va Davlat",          desc: "Toğ tizmalari rasmlarini körib, qaysi davlatda ekanligini toping." },
};

export default function GamePlay() {
  const { slug } = useParams();
  const GameComponent = registry[slug];
  if (!GameComponent) return <Navigate to="/games" replace />;
  const meta = gameMeta[slug] || { title: "Öyin", desc: "Interaktiv geografiya öyini." };
  return (
    <>
      <SEO title={meta.title} description={meta.desc} url={`/games/play/${slug}`} />
      <Suspense fallback={null}>
        <GameComponent key={slug} />
      </Suspense>
    </>
  );
}
