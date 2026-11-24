// The horizontal route map for wide screens: public/map/wide.svg holds the streets,
// and the route, stops and labels are drawn here so they use the site's fonts. The route
// is the campus map's own, turned onto this map (41.5° anticlockwise, ×1.012).
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
          d="M1028.6 163.7L1006.8 165L991.9 162.7L976.8 161L912.4 166.5L872.5 168.2L866.9 168.4L858.7 169.4L854.2 172.2L825.6 189.7L779.2 216.2L747 232.7L735.6 238.6L721.6 245.5L708 249.8L693.9 251.6L681 250.4L671.2 253.4L664 261L637.9 348.2L636 354.5L633.3 359.6L628.3 364.7L605.8 381.3L598.6 382.6L581.3 385.8L466.3 392L466.1 392L464.2 392.1L426 394.2L399.7 387.3L295.7 392.9L247.4 395.5L235.6 395L232 393.4L227.2 384.9L226.4 370.5L226 363.8L220.3 259.4L214 259.8L212.4 259.8L184.1 261.4"
          fill="none"
          stroke="#F5B82E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.16"
        />
        <path
          d="M1028.6 163.7L1006.8 165L991.9 162.7L976.8 161L912.4 166.5L872.5 168.2L866.9 168.4L858.7 169.4L854.2 172.2L825.6 189.7L779.2 216.2L747 232.7L735.6 238.6L721.6 245.5L708 249.8L693.9 251.6L681 250.4L671.2 253.4L664 261L637.9 348.2L636 354.5L633.3 359.6L628.3 364.7L605.8 381.3L598.6 382.6L581.3 385.8L466.3 392L466.1 392L464.2 392.1L426 394.2L399.7 387.3L295.7 392.9L247.4 395.5L235.6 395L232 393.4L227.2 384.9L226.4 370.5L226 363.8L220.3 259.4L214 259.8L212.4 259.8L184.1 261.4"
          fill="none"
          stroke="#F5B82E"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1193.8 136L1191.3 134.3L1189.2 133.1L1177.2 125.4L1176.5 126.4L1175.8 127.6L1173.9 130.8L1173 132.2L1169.4 138.2L1164.4 135L1155.8 130.4L1146 126.8L1135.9 124L1125.5 123L1118.6 123.1L1115.5 123.1L1104.9 124.3L1094.7 126.4L1085.7 129.6L1077.1 133.4L1075.4 134.5L1074.3 136L1073.5 138L1073.4 140.1L1074.2 142.1L1075.5 143.6L1077.3 144.8L1079.4 145.2L1081.5 144.8L1083.3 143.8L1084.6 142.3L1085.4 140.6L1085.6 138.7L1085.1 136.8L1084.1 135.1L1082.7 133.9L1080.8 133.1L1078.9 133L1076.8 133.3L1074.5 134.1L1071.7 135.5L1068.6 138.7L1067.4 140.4L1066.8 142.4L1066.2 144.2L1064.8 145.9L1055.3 149.4L1053.4 150.6L1051.7 151.9L1049 154.5L1046.4 157.4L1038.9 162.3L1028.6 163.7"
          fill="none"
          stroke="#3ED6F0"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.1 8"
        />
        <path
          d="M184.1 261.4L212.4 259.8L213.5 232L226.4 231.8L224.2 202.6L218.3 111.8"
          fill="none"
          stroke="#3ED6F0"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.1 8"
        />
        <path
          d="M223.3 102.8L224.1 120.5L226.1 162.9L239.7 162.1L236.9 104L236.8 101.9L232.6 102.2L223.3 102.8Z"
          fill="#F5B82E"
          fillOpacity="0.35"
          stroke="#F5B82E"
          strokeWidth="2"
        />
        <circle cx="725.9" cy="240.1" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <circle cx="611.3" cy="377" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <circle cx="409" cy="389.9" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <circle cx="285.5" cy="392.4" r="5" fill="#0E1218" stroke="#F5B82E" strokeWidth="2" />
        <rect x="691.6" y="250.1" width="68.7" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="725.9"
          y="263.1"
          textAnchor="middle"
          fill="#8A95A5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px" }}
        >
          Kütüphane
        </text>
        <rect x="542.3" y="387" width="138" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="611.3"
          y="400"
          textAnchor="middle"
          fill="#8A95A5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px" }}
        >
          Yabancı Diller Okulu
        </text>
        <rect x="352.6" y="399.9" width="112.8" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="409"
          y="412.9"
          textAnchor="middle"
          fill="#8A95A5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px" }}
        >
          İnşaat Fakültesi
        </text>
        <rect x="217.5" y="364.4" width="136" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="285.5"
          y="377.4"
          textAnchor="middle"
          fill="#8A95A5"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "11px" }}
        >
          Sanat-Tasarım Fakültesi
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
        <g transform="translate(226.4 115.4)">
          <path
            d="M0 0 C-7 -10 -12 -16 -12 -24 A12 12 0 0 1 12 -24 C12 -16 7 -10 0 0 Z"
            fill="#F5B82E"
            stroke="#0B0E13"
            strokeWidth="2"
          />
          <circle cy="-24" r="4.5" fill="#0B0E13" />
        </g>
        <circle cx="1202.3" cy="109" r="12" fill="#0B0E13" stroke="#E9EDF2" strokeWidth="2" />
        <text
          x="1202.3"
          y="113.5"
          textAnchor="middle"
          fill="#E9EDF2"
          style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "12px", fontWeight: "700" }}
        >
          M
        </text>
        <g transform="translate(1224.3 129.5)">
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
            fill="#0B0E13"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
          >
            1
          </text>
        </g>
        <g transform="translate(1028.6 163.7)">
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
            fill="#0B0E13"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
          >
            2
          </text>
        </g>
        <g transform="translate(184.1 261.4)">
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
            fill="#0B0E13"
            style={{ fontFamily: "var(--font-unbounded), sans-serif", fontSize: "11px", fontWeight: "700" }}
          >
            3
          </text>
        </g>
        <rect x="1242.3" y="120.5" width="93.6" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="1248.3"
          y="133.5"
          fill="#E9EDF2"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px" }}
        >
          Metro çıkışı
        </text>
        <rect x="964.8" y="179.7" width="127.6" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="970.8"
          y="192.7"
          fill="#E9EDF2"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px" }}
        >
          Davutpaşa Kampüsü
        </text>
        <rect x="89.7" y="277.4" width="188.8" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="95.7"
          y="290.4"
          fill="#E9EDF2"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "12px" }}
        >
          Spor Kompleksi · Yemekhane
        </text>
        <rect x="174.8" y="55.4" width="103.2" height="18" fill="#0B0E13" fillOpacity="0.88" />
        <text
          x="180.8"
          y="68.4"
          fill="#F5B82E"
          style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif", fontSize: "13px" }}
        >
          Tarihi Hamam
        </text>
      </svg>
    </span>
  );
}
