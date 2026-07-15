import { feature } from 'topojson-client';
import worldTopo from 'world-atlas/countries-110m.json';

export const worldCountries = feature(worldTopo, worldTopo.objects.countries);

export const countryPools = {
  easy: ['Russia', 'Canada', 'United States of America', 'Brazil', 'China', 'Australia', 'India', 'Argentina', 'Kazakhstan', 'Algeria', 'Mexico', 'Indonesia', 'Sudan', 'Mongolia', 'Saudi Arabia'],
  medium: ['France', 'Germany', 'Spain', 'Ukraine', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Japan', 'Uzbekistan', 'Iran', 'Pakistan', 'Thailand', 'Kenya', 'Poland', 'Italy', 'Sweden', 'Norway', 'Afghanistan', 'Tajikistan', 'Kyrgyzstan', 'Turkmenistan'],
  hard: ['Fiji', 'Jamaica', 'Lebanon', 'Israel', 'Kuwait', 'Qatar', 'Cyprus', 'Luxembourg', 'Montenegro', 'Moldova', 'Slovenia', 'Estonia', 'eSwatini', 'Djibouti', 'Timor-Leste', 'Brunei', 'Vanuatu'],
};
