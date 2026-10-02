// The horizontal route map for wide screens: public/map/wide.svg holds the streets,
// and the route, stops and labels are drawn here so they use the site's fonts.
export const WIDE_W = 1360;
export const WIDE_H = 500;
// Its scale bar spanned 81.4 units for 100 m, and north is turned 41.4° clockwise.
export const WIDE_METERS_PER_UNIT = 100 / 81.4;
export const WIDE_NORTH = 41.4;

export function WideMap() {
  return (
    <span className="absolute inset-0 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/map/wide.svg"
        alt=""
        width={WIDE_W}
        height={WIDE_H}
        draggable={false}
        className="absolute inset-0 size-full select-none"
      />
      <svg viewBox="0 0 1360 500" aria-hidden="true" className="absolute inset-0 size-full">
        <defs>
          <path
            id="wide-rl1"
            d="M805.5 30.6 L828.9 41.2 L860.9 75.5 L885.6 103.2 L910.0 121.6 L925.9 130.0 L950.6 135.6 L1002.4 138.3 L1040.4 136.0 L1079.7 118.7 L1090.4 114.3 L1113.3 103.7"
          />
          <path
            id="wide-rl2"
            d="M1138.7 314.4 L1149.1 302.1 L1151.5 299.2 L1158.0 290.9 L1167.3 276.3 L1171.8 266.7 L1178.9 247.4 L1181.3 234.6 L1181.6 224.4 L1179.8 213.7 L1171.4 189.1 L1167.3 177.0 L1163.9 168.2"
          />
          <path
            id="wide-rl4"
            d="M1103.5 43.7 L1150.7 67.1 L1161.9 72.8 L1174.4 79.6 L1184.9 85.7 L1201.8 96.4 L1210.7 102.0 L1218.8 107.8 L1224.4 112.5 L1233.9 120.9 L1246.7 132.4"
          />
        </defs>
        <text
          dy="-11"
          style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.04em",
          }}
          fill="#6B7788"
        >
          <textPath href="#wide-rl1" startOffset="50%" textAnchor="middle">
            Yıldız Cd.
          </textPath>
        </text>
        <text
          dy="-11"
          style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.04em",
          }}
          fill="#6B7788"
        >
          <textPath href="#wide-rl2" startOffset="50%" textAnchor="middle">
            Eski Londra Asfaltı Cd.
          </textPath>
        </text>
        <text
          dy="-11"
          style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.04em",
          }}
          fill="#6B7788"
        >
          <textPath href="#wide-rl4" startOffset="50%" textAnchor="middle">
            Dumlupınar Cd.
          </textPath>
        </text>
        <path
          d="M1041.1 160.5 L1018.9 161.9 L1003.7 159.7 L988.3 158.0 L922.6 163.7 L881.8 165.5 L876.1 165.7 L867.7 166.7 L863.1 169.6 L833.8 187.5 L786.3 214.6 L753.4 231.5 L741.7 237.6 L727.4 244.7 L713.5 249.0 L699.0 251.0 L685.9 249.7 L675.9 252.7 L668.5 260.7 L641.3 349.6 L639.4 356.0 L636.7 361.2 L631.5 366.4 L608.4 383.5 L601.1 384.8 L583.4 388.0 L466.0 394.6 L465.8 394.6 L463.9 394.7 L424.7 396.9 L398.0 389.9 L291.8 395.9 L242.5 398.7 L230.5 398.1 L226.8 396.5 L221.9 387.9 L221.2 373.2 L220.8 366.4 L215.5 259.9 L209.1 260.2 L207.5 260.3 L178.6 262.0"
          fill="none"
          stroke="#F5B82E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.16"
        />
        <path
          d="M1041.1 160.5 L1018.9 161.9 L1003.7 159.7 L988.3 158.0 L922.6 163.7 L881.8 165.5 L876.1 165.7 L867.7 166.7 L863.1 169.6 L833.8 187.5 L786.3 214.6 L753.4 231.5 L741.7 237.6 L727.4 244.7 L713.5 249.0 L699.0 251.0 L685.9 249.7 L675.9 252.7 L668.5 260.7 L641.3 349.6 L639.4 356.0 L636.7 361.2 L631.5 366.4 L608.4 383.5 L601.1 384.8 L583.4 388.0 L466.0 394.6 L465.8 394.6 L463.9 394.7 L424.7 396.9 L398.0 389.9 L291.8 395.9 L242.5 398.7 L230.5 398.1 L226.8 396.5 L221.9 387.9 L221.2 373.2 L220.8 366.4 L215.5 259.9 L209.1 260.2 L207.5 260.3 L178.6 262.0"
          fill="none"
          stroke="#F5B82E"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1210.0 132.0 L1207.3 130.3 L1205.3 129.0 L1193.0 121.2 L1192.4 122.3 L1191.7 123.4 L1189.7 126.6 L1188.8 128.2 L1185.1 134.3 L1179.9 130.9 L1171.1 126.4 L1161.2 122.6 L1150.9 119.9 L1140.3 118.8 L1133.2 118.9 L1130.0 119.0 L1119.3 120.2 L1108.8 122.4 L1099.6 125.7 L1090.8 129.6 L1089.1 130.7 L1087.9 132.2 L1087.1 134.2 L1087.1 136.4 L1087.8 138.4 L1089.2 140.0 L1091.0 141.1 L1093.1 141.5 L1095.2 141.2 L1097.1 140.1 L1098.5 138.7 L1099.2 136.9 L1099.4 134.9 L1099.0 133.0 L1098.0 131.3 L1096.5 130.0 L1094.7 129.3 L1092.7 129.1 L1090.5 129.5 L1088.2 130.3 L1085.3 131.7 L1082.1 134.9 L1080.8 136.8 L1080.3 138.8 L1079.6 140.5 L1078.2 142.4 L1068.5 145.9 L1066.5 147.1 L1064.9 148.4 L1062.1 151.2 L1059.4 154.1 L1051.7 159.2 L1041.1 160.5 L1041.1 160.5"
          fill="none"
          stroke="#3ED6F0"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.1 8"
        />
        <path
          d="M178.6 262.0 L189.0 266.1 L207.6 266.8 L207.5 260.3 L208.7 232.0 L210.1 231.9 L216.5 231.5 L218.7 231.4 L219.6 231.4 L240.8 230.2 L239.2 193.2 L237.6 154.7 L237.1 143.2 L236.6 129.3 L235.4 101.3"
          fill="none"
          stroke="#3ED6F0"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.1 8"
        />
        <circle cx="608.4" cy="383.5" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <rect x="539.4" y="393.5" width="138.0" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="545.4"
          y="406.5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px", fontWeight: "600" }}
          fill="#8A95A5"
        >
          Yabancı Diller Okulu
        </text>
        <circle cx="434.3" cy="396.4" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <rect x="377.9" y="406.4" width="112.8" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="383.9"
          y="419.4"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px", fontWeight: "600" }}
          fill="#8A95A5"
        >
          İnşaat Fakültesi
        </text>
        <circle cx="733.1" cy="241.9" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <rect x="698.7" y="251.9" width="68.7" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="704.7"
          y="264.9"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px", fontWeight: "600" }}
          fill="#8A95A5"
        >
          Kütüphane
        </text>
        <path
          d="M219.4 100.1 L220.1 118.2 L222.0 161.4 L235.7 160.7 L233.2 101.4 L233.2 99.3 L228.9 99.5 L219.4 100.1 Z"
          fill="#F5B82E"
          fillOpacity="0.35"
          stroke="#F5B82E"
          strokeWidth="2"
        />
        <g transform="translate(226.5 113.6)">
          <path
            d="M0 0 C-7 -10 -12 -16 -12 -24 A12 12 0 0 1 12 -24 C12 -16 7 -10 0 0 Z"
            fill="#F5B82E"
            stroke="#0B0E13"
            strokeWidth="2"
          />
          <circle cy="-24" r="4.5" fill="#0B0E13" />
        </g>
        <circle cx="1188.0" cy="111.5" r="12" fill="#0B0E13" stroke="#E9EDF2" strokeWidth="2" />
        <text
          x="1188.0"
          y="116.0"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "12px", fontWeight: "700" }}
          fill="#E9EDF2"
        >
          M
        </text>
        <g transform="translate(1210.0 132.0)">
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            transform="rotate(45)"
            fill="#3ED6F0"
            stroke="#0B0E13"
            strokeWidth="2"
          />
          <text
            y="4.5"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
            fill="#0B0E13"
          >
            1
          </text>
        </g>
        <g transform="translate(1041.1 160.5)">
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            transform="rotate(45)"
            fill="#F5B82E"
            stroke="#0B0E13"
            strokeWidth="2"
          />
          <text
            y="4.5"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
            fill="#0B0E13"
          >
            2
          </text>
        </g>
        <g transform="translate(178.6 262.0)">
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            transform="rotate(45)"
            fill="#F5B82E"
            stroke="#0B0E13"
            strokeWidth="2"
          />
          <text
            y="4.5"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
            fill="#0B0E13"
          >
            3
          </text>
        </g>
        <rect x="1228.0" y="123.0" width="93.6" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="1234.0"
          y="136.0"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px", fontWeight: "600" }}
          fill="#E9EDF2"
        >
          Metro çıkışı
        </text>
        <rect x="977.3" y="176.5" width="127.6" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="983.3"
          y="189.5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px", fontWeight: "600" }}
          fill="#E9EDF2"
        >
          Davutpaşa Kampüsü
        </text>
        <rect x="84.2" y="278.0" width="188.8" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="90.2"
          y="291.0"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px", fontWeight: "600" }}
          fill="#E9EDF2"
        >
          Spor Kompleksi · Yemekhane
        </text>
        <rect x="174.9" y="53.6" width="103.2" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="180.9"
          y="66.6"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "13px", fontWeight: "600" }}
          fill="#F5B82E"
        >
          Tarihi Hamam
        </text>
        <text
          x="165.7"
          y="224.4"
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-manrope), system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.08em",
          }}
          fill="#6B7788"
        >
          YEMEKHANE
        </text>
      </svg>
    </span>
  );
}
