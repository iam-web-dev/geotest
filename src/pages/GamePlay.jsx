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
  flag:          { title: 'Bayroqni Bil',              desc: "Dunyo davlatlarining bayroqlarini taxmin qiling va geografiya bilimlaringizni sinab koʻring." },
  capital:       { title: 'Poytaxtni Top',             desc: "Davlatlar poytaxtlarini toping — interaktiv va qiziqarli geografiya oʻyini." },
  landmark:      { title: 'Mashhur Joylar',            desc: "Dunyo boʻylab mashhur tarixiy va geografik yodgorliklarni toping." },
  climate:       { title: 'Iqlimni Aniqlang',          desc: "Dunyo iqlim mintaqalari va ob-havosi haqida bilimlaringizni sinab koʻring." },
  continentRush: { title: "Qit'ani Toping",            desc: "Qit'alarni tez aniqlang — vaqt cheklangan tezlik oʻyini." },
  findCountry:   { title: 'Xaritada Davlat',           desc: "Interaktiv dunyo xaritasida berilgan davlatni toping." },
  uzbRegions:    { title: "Oʻzbekiston Viloyatlari",   desc: "Oʻzbekiston viloyatlarini xaritada toping va ularga oid savollarni javoblang." },
  river:         { title: "Daryolarni Bil",            desc: "Dunyo va Markaziy Osiyo daryolarini xaritada toping va aniqlang." },
  mountainCountry: { title: "Togʻ va Davlat",          desc: "Togʻ tizmalari rasmlarini koʻrib, qaysi davlatda ekanligini toping." },
};

export default function GamePlay() {
  const { slug } = useParams();
  const GameComponent = registry[slug];
  if (!GameComponent) return <Navigate to="/games" replace />;
  const meta = gameMeta[slug] || { title: "Oʻyin", desc: "Interaktiv geografiya oʻyini." };
  return (
    <>
      <SEO title={meta.title} description={meta.desc} url={`/games/play/${slug}`} />
      <Suspense fallback={null}>
        <GameComponent key={slug} />
      </Suspense>
    </>
  );
}
