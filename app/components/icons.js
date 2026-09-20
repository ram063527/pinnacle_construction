function Svg({ children, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconTrophy(props) {
  return (
    <Svg {...props}>
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a3 3 0 0 0 3 3M16 5h3a3 3 0 0 1-3 3" />
      <path d="M12 12v3M9 19h6M9 19c0-1.5.5-2 1.5-2h3c1 0 1.5.5 1.5 2" />
    </Svg>
  );
}

export function IconEye(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </Svg>
  );
}

export function IconLeaf(props) {
  return (
    <Svg {...props}>
      <path d="M20 4c.5 8-4 15-14 15-1 0-2-4 1-8C10 6 16 4 20 4Z" />
      <path d="M6 19c2-4 5-7 10-10" />
    </Svg>
  );
}

export function IconClock(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

export function IconTag(props) {
  return (
    <Svg {...props}>
      <path d="M4 4h7l9 9-7 7-9-9V4Z" />
      <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconShieldCheck(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6c0 5-3.5 7.5-7 8.5-3.5-1-7-3.5-7-8.5V6l7-2.5Z" />
      <path d="M9 12.5l2 2 4-4.2" />
    </Svg>
  );
}

export function IconHome(props) {
  return (
    <Svg {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </Svg>
  );
}

export function IconDumbbell(props) {
  return (
    <Svg {...props}>
      <path d="M4 10v4M6.5 8v8M17.5 8v8M20 10v4" />
      <path d="M6.5 12h11" />
    </Svg>
  );
}

export function IconParking(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M10 16V8h3.2a2.5 2.5 0 0 1 0 5H10" />
    </Svg>
  );
}

export function IconShieldLock(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6c0 5-3.5 7.5-7 8.5-3.5-1-7-3.5-7-8.5V6l7-2.5Z" />
      <rect x="9.5" y="11" width="5" height="4" rx="1" />
      <path d="M10.5 11V9.5a1.5 1.5 0 0 1 3 0V11" />
    </Svg>
  );
}

export function IconSun(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.5 12H3M21 12h-1.5M5.6 5.6l1 1M17.4 17.4l1 1M18.4 5.6l-1 1M6.6 17.4l-1 1" />
    </Svg>
  );
}

export function IconBuildingOffice(props) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="10" height="18" rx="1" />
      <path d="M15 9h4v12h-4" />
      <path d="M8 7h1M11 7h1M8 11h1M11 11h1M8 15h1M11 15h1" />
    </Svg>
  );
}

export function IconArrowPath(props) {
  return (
    <Svg {...props}>
      <path d="M4 12a8 8 0 0 1 13.5-5.8L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.5 5.8L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </Svg>
  );
}

export function IconAcademicCap(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 8 12 4l9.5 4-9.5 4-9.5-4Z" />
      <path d="M6 10.5V15c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
    </Svg>
  );
}

export function IconFuel(props) {
  return (
    <Svg {...props}>
      <path d="M5 20V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M3.5 20h9.5" />
      <path d="M13 10.5l2.3 2v5a1.7 1.7 0 0 0 3.4 0v-4a2 2 0 0 0-2-2h-.2" />
      <path d="M17 8.5l1.8 1.8" />
    </Svg>
  );
}

export function IconMedicalCross(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </Svg>
  );
}

export function IconShoppingCart(props) {
  return (
    <Svg {...props}>
      <path d="M3 4h2l2.2 11h9.6L19 8H6" />
      <circle cx="9.5" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconPlane(props) {
  return (
    <Svg {...props}>
      <path d="M12 2.5c.8 0 1.4.9 1.4 2v5l6 3.5v2l-6-1.7v3.7l1.8 1.4v1.5L12 19l-3.2.9v-1.5l1.8-1.4v-3.7l-6 1.7v-2l6-3.5v-5c0-1.1.6-2 1.4-2Z" />
    </Svg>
  );
}

export function IconTrain(props) {
  return (
    <Svg {...props}>
      <rect x="5" y="3.5" width="14" height="12" rx="3" />
      <path d="M5 9.5h14" />
      <path d="M9 12.5h.01M15 12.5h.01" />
      <path d="M7.5 15.5 5.5 20.5M16.5 15.5l2 5" />
      <path d="M7 20.5h10" />
    </Svg>
  );
}

export function IconPhone(props) {
  return (
    <Svg {...props}>
      <path d="M6 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1-.9 1.8-1.9 1.6C10.5 18 6 13.5 4.4 7.4 4.2 6.4 5 5.5 6 5.5Z" />
    </Svg>
  );
}

export function IconEnvelope(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7 12 13l7.5-6" />
    </Svg>
  );
}

export function IconMapPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.3 7-11.5a7 7 0 0 0-14 0C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </Svg>
  );
}

export function IconUsers(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8.5" r="2.75" />
      <path d="M3.5 19c.5-3 2.7-4.5 5.5-4.5s5 1.5 5.5 4.5" />
      <circle cx="17" cy="9.5" r="2.1" />
      <path d="M15.5 14.7c2.2.3 3.7 1.7 4 4.3" />
    </Svg>
  );
}

export function IconBuilding(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="9" height="16" rx="1" />
      <rect x="13" y="9" width="7" height="11" rx="1" />
      <path d="M7 8h1M10 8h1M7 12h1M10 12h1M7 16h1M10 16h1" />
    </Svg>
  );
}

export function IconCalendar(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </Svg>
  );
}

export function IconChevronLeft(props) {
  return (
    <Svg {...props}>
      <path d="M14.5 5 8 12l6.5 7" />
    </Svg>
  );
}

export function IconChevronRight(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 5 16 12l-6.5 7" />
    </Svg>
  );
}

export function IconQuote(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 6.5c-3 1-4.5 3.3-4.5 6.3 0 2.3 1.5 3.7 3.3 3.7 1.6 0 2.9-1.2 2.9-2.8 0-1.5-1-2.6-2.4-2.7.3-1.8 1.5-3 3.2-3.7L9.5 6.5Z" fill="currentColor" stroke="none" />
      <path d="M18 6.5c-3 1-4.5 3.3-4.5 6.3 0 2.3 1.5 3.7 3.3 3.7 1.6 0 2.9-1.2 2.9-2.8 0-1.5-1-2.6-2.4-2.7.3-1.8 1.5-3 3.2-3.7L18 6.5Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconDownload(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
      <path d="M4.5 17.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
    </Svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5 15 15" />
    </Svg>
  );
}

export function IconStar(props) {
  return (
    <Svg {...props}>
      <path
        d="M12 3.5l2.55 5.17 5.7.83-4.13 4.02.98 5.68L12 16.4l-5.1 2.8.98-5.68-4.13-4.02 5.7-.83L12 3.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconCompass(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15 9l-2 6-4 2 2-6 4-2Z" />
    </Svg>
  );
}

export function IconFlag(props) {
  return (
    <Svg {...props}>
      <path d="M6 3.5v17" />
      <path d="M6 4.5c2-1 4-1 6 0s4 1 6 0v8c-2 1-4 1-6 0s-4-1-6 0v-8Z" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  );
}

export const iconMap = {
  trophy: IconTrophy,
  eye: IconEye,
  leaf: IconLeaf,
  clock: IconClock,
  tag: IconTag,
  shieldCheck: IconShieldCheck,
  home: IconHome,
  dumbbell: IconDumbbell,
  parking: IconParking,
  shieldLock: IconShieldLock,
  sun: IconSun,
  buildingOffice: IconBuildingOffice,
  arrowPath: IconArrowPath,
  academicCap: IconAcademicCap,
  fuel: IconFuel,
  medicalCross: IconMedicalCross,
  shoppingCart: IconShoppingCart,
  plane: IconPlane,
  train: IconTrain,
  phone: IconPhone,
  envelope: IconEnvelope,
  mapPin: IconMapPin,
  users: IconUsers,
  building: IconBuilding,
  calendar: IconCalendar,
  search: IconSearch,
  download: IconDownload,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  quote: IconQuote,
  check: IconCheck,
  star: IconStar,
  compass: IconCompass,
  flag: IconFlag,
};

export function Icon({ name, className }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component className={className} />;
}
