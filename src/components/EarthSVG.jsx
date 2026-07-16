// Equirectangular projection: center lon=0°, x=100+(lon/180)*82, y=100-(lat/90)*82
// Circle: center(100,100) r=82, clipPath used for all continents

export function EarthSVG({ size = 160 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id="gt-ocean" cx="36%" cy="30%" r="72%">
          <stop offset="0%"   stopColor="#5BA8F8" />
          <stop offset="55%"  stopColor="#2F80ED" />
          <stop offset="100%" stopColor="#1452A8" />
        </radialGradient>
        <radialGradient id="gt-atmo" cx="50%" cy="50%" r="50%">
          <stop offset="78%"  stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(47,128,237,0.28)" />
        </radialGradient>
        <radialGradient id="gt-sheen" cx="30%" cy="26%" r="48%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0"   />
        </radialGradient>
        <clipPath id="gt-clip">
          <circle cx="100" cy="100" r="82" />
        </clipPath>
      </defs>

      {/* Atmosphere */}
      <circle cx="100" cy="100" r="92"   fill="url(#gt-atmo)" />
      <circle cx="100" cy="100" r="85.5" fill="none" stroke="rgba(47,128,237,0.22)" strokeWidth="5" />
      <circle cx="100" cy="100" r="83"   fill="none" stroke="rgba(47,128,237,0.12)" strokeWidth="1.5" />

      {/* ── Spinning group ── */}
      <g className="gt-earth-spin">

        {/* Ocean */}
        <circle cx="100" cy="100" r="82" fill="url(#gt-ocean)" clipPath="url(#gt-clip)" />

        {/* Grid lines */}
        <g clipPath="url(#gt-clip)" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.65">
          {/* Equator */}
          <line x1="18" y1="100" x2="182" y2="100" />
          {/* Lat ±30° */}
          <ellipse cx="100" cy="72.7" rx="71" ry="11" />
          <ellipse cx="100" cy="127.3" rx="71" ry="11" />
          {/* Lat ±60° */}
          <ellipse cx="100" cy="45.3" rx="41" ry="7" />
          <ellipse cx="100" cy="154.7" rx="41" ry="7" />
          {/* Lon 0° / 180° */}
          <line x1="100" y1="18" x2="100" y2="182" />
          {/* Lon ±45° */}
          <ellipse cx="100" cy="100" rx="58" ry="82" />
          {/* Lon ±90° */}
          <ellipse cx="100" cy="100" rx="82" ry="82" />
        </g>

        {/* ── Continents ── */}
        <g clipPath="url(#gt-clip)" fill="#8FD3FF">

          {/* ── Greenland ── */}
          <path d="
            M 65 26 C 60 22, 52 22, 48 28
            C 44 34, 45 43, 50 48
            C 55 52, 63 52, 69 47
            C 75 42, 78 34, 74 27
            C 71 23, 68 24, 65 26 Z
          " opacity="0.88"/>

          {/* ── North America ── */}
          <path d="
            M 22 44 C 26 37, 33 30, 42 27
            C 51 24, 61 25, 67 30
            C 73 35, 75 43, 76 51
            C 77 58, 75 65, 71 70
            C 68 74, 66 78, 65 83
            C 64 88, 63 93, 64 98
            C 65 102, 63 105, 61 106
            C 58 107, 54 104, 52 99
            C 50 93, 48 86, 48 80
            C 48 75, 46 70, 43 67
            C 40 63, 39 57, 39 51
            C 34 51, 28 52, 23 56
            C 19 59, 18 55, 19 48
            C 20 45, 21 43, 22 44 Z
          " opacity="0.92"/>

          {/* Caribbean / Yucatan stub */}
          <path d="M 63 96 C 61 94,58 95,57 99 C 56 103,59 106,62 105 C 65 104,66 99,63 96 Z" opacity="0.78"/>
          {/* Cuba */}
          <path d="M 60 87 C 57 85,54 87,55 91 C 56 94,60 95,63 93 C 65 91,64 88,60 87 Z" opacity="0.78"/>

          {/* ── South America ── */}
          <path d="
            M 66 91 C 70 87, 77 87, 82 91
            C 86 95, 87 103, 87 110
            C 87 117, 85 123, 82 129
            C 79 134, 75 139, 71 147
            C 69 152, 68 157, 67 160
            C 64 157, 62 150, 61 142
            C 60 133, 62 122, 64 113
            C 62 107, 62 100, 63 94
            C 64 91, 65 90, 66 91 Z
          " opacity="0.92"/>

          {/* ── Europe ── */}
          <path d="
            M 97 67 C 95 62, 94 57, 95 52
            C 96 47, 99 43, 103 40
            C 107 38, 111 37, 113 39
            C 115 41, 115 46, 115 52
            C 116 57, 116 62, 115 67
            C 113 71, 110 73, 107 73
            C 104 73, 101 71, 99 68
            C 98 67, 97 67, 97 67 Z
          " opacity="0.92"/>

          {/* Scandinavian peninsula */}
          <path d="
            M 104 40 C 105 36, 108 34, 112 35
            C 114 37, 114 42, 112 48
            C 110 53, 107 56, 104 54
            C 102 51, 103 44, 104 40 Z
          " opacity="0.85"/>

          {/* British Isles */}
          <path d="M 92 51 C 90 48,87 50,88 55 C 89 59,93 59,94 55 C 95 52,93 50,92 51 Z" opacity="0.80"/>
          <path d="M 90 61 C 88 59,86 61,87 64 C 88 67,91 67,91 64 C 91 62,91 61,90 61 Z" opacity="0.72"/>

          {/* Iberian peninsula */}
          <path d="M 95 67 C 93 64,90 65,90 70 C 90 74,93 77,97 76 C 100 75,101 71,99 68 C 98 67,96 67,95 67 Z" opacity="0.85"/>

          {/* Italy */}
          <path d="M 105 65 C 103 63,101 65,102 70 C 103 74,106 77,109 75 C 111 73,111 68,109 65 C 108 64,106 64,105 65 Z" opacity="0.78"/>

          {/* ── Africa ── */}
          <path d="
            M 98 68 C 104 65, 112 65, 117 69
            C 122 74, 125 82, 126 92
            C 127 101, 126 112, 122 122
            C 118 131, 113 137, 108 139
            C 103 141, 99 137, 96 131
            C 92 124, 91 115, 91 106
            C 90 96, 91 87, 93 79
            C 95 73, 96 69, 98 68 Z
          " opacity="0.92"/>

          {/* Madagascar */}
          <path d="
            M 132 109 C 130 104, 127 105, 126 113
            C 125 121, 128 130, 133 132
            C 136 133, 139 129, 138 121
            C 137 114, 134 111, 132 109 Z
          " opacity="0.80"/>

          {/* ── Asia (main body) ── */}
          <path d="
            M 114 63 C 119 59, 125 59, 130 62
            C 134 65, 136 71, 137 78
            C 138 85, 137 92, 135 97
            C 143 95, 152 93, 156 99
            C 159 104, 157 111, 154 115
            C 159 114, 164 111, 167 107
            C 169 104, 169 99, 167 94
            C 165 88, 163 82, 162 76
            C 161 68, 161 61, 160 56
            C 164 55, 167 57, 169 62
            C 170 67, 169 73, 168 78
            C 170 76, 173 72, 173 66
            C 173 60, 171 53, 167 49
            C 163 45, 157 43, 151 44
            C 144 44, 137 46, 131 49
            C 125 52, 121 56, 118 59
            C 116 57, 115 60, 114 63 Z
          " opacity="0.92"/>

          {/* N Siberia + Chukotka toward Pacific */}
          <path d="
            M 126 56 C 130 47, 138 40, 147 37
            C 156 34, 165 35, 171 40
            C 175 44, 176 50, 174 56
            C 179 52, 181 47, 180 42
            C 178 37, 173 35, 167 36
            C 172 38, 170 45, 168 50
            C 165 47, 161 46, 156 46
            C 148 46, 138 48, 132 52
            C 129 53, 127 55, 126 56 Z
          " opacity="0.88"/>

          {/* Arabian peninsula */}
          <path d="
            M 122 72 C 117 68, 115 72, 116 81
            C 117 89, 122 97, 129 99
            C 134 100, 138 95, 137 86
            C 136 78, 130 72, 122 72 Z
          " opacity="0.85"/>

          {/* Indian subcontinent */}
          <path d="
            M 136 76 C 131 73, 127 77, 127 86
            C 127 95, 132 105, 139 109
            C 145 112, 150 108, 151 99
            C 152 90, 148 80, 141 76
            C 139 75, 137 75, 136 76 Z
          " opacity="0.88"/>

          {/* Sri Lanka */}
          <path d="M 143 111 C 141 109,139 111,140 116 C 141 119,144 119,145 116 C 146 113,144 111,143 111 Z" opacity="0.75"/>

          {/* SE Asia peninsula (Indochina) */}
          <path d="
            M 151 90 C 148 86, 145 88, 144 95
            C 143 102, 146 111, 152 114
            C 156 116, 160 112, 159 105
            C 158 98, 155 91, 151 90 Z
          " opacity="0.84"/>

          {/* Borneo */}
          <path d="
            M 158 103 C 154 100, 151 103, 151 111
            C 151 119, 155 125, 162 124
            C 167 123, 170 117, 168 110
            C 166 105, 162 102, 158 103 Z
          " opacity="0.80"/>

          {/* Japan */}
          <path d="
            M 163 58 C 161 55, 158 57, 158 63
            C 158 69, 162 75, 166 74
            C 169 73, 171 68, 169 62
            C 167 58, 165 57, 163 58 Z
          " opacity="0.80"/>

          {/* Philippines */}
          <path d="M 161 93 C 159 90,157 92,158 97 C 159 101,162 102,164 99 C 166 96,163 93,161 93 Z" opacity="0.70"/>
          {/* Taiwan */}
          <path d="M 158 76 C 156 74,154 76,155 80 C 156 83,159 84,160 81 C 161 78,159 76,158 76 Z" opacity="0.68"/>
          {/* Hawaii (~155°W,20°N) */}
          <path d="M 30 82 C 28 80,26 82,27 86 C 28 89,31 89,32 86 C 33 84,31 82,30 82 Z" opacity="0.65"/>
          {/* Kamchatka peninsula */}
          <path d="M 172 55 C 170 52,167 54,167 60 C 167 67,170 73,174 73 C 177 73,178 68,177 62 C 176 58,174 55,172 55 Z" opacity="0.75"/>

          {/* ── Australia ── */}
          <path d="
            M 153 118 C 156 109, 162 107, 168 107
            C 172 107, 174 112, 174 119
            C 174 127, 173 133, 170 138
            C 167 142, 163 143, 158 141
            C 154 139, 151 134, 151 128
            C 150 123, 151 120, 153 118 Z
          " opacity="0.92"/>

          {/* New Zealand */}
          <path d="M 176 136 C 174 132,171 134,171 140 C 171 145,174 148,177 146 C 179 144,180 139,178 136 C 177 135,177 135,176 136 Z" opacity="0.73"/>

        </g>

        {/* Specular sheen */}
        <circle cx="100" cy="100" r="82" fill="url(#gt-sheen)" clipPath="url(#gt-clip)" />
      </g>

      {/* Rim */}
      <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}
