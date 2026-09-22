import Image from "next/image";

// The red "P" from the logo, cropped square for the Studio navbar. The full logo is
// a wide wordmark and turns illegible when Sanity squeezes it into its icon slot.
export function StudioIcon() {
  return (
    <Image
      src="/images/studio-icon.png"
      alt=""
      width={128}
      height={128}
      style={{ width: "100%", height: "100%", objectFit: "contain", background: "#fff" }}
    />
  );
}
