import Image from "next/image";
import fitboxLogo from "@/assets/fitbox/logo.png";

/** Static FitBox app mockup — phone frame with the logo centered on screen. */
export function PhoneMockup() {
  return (
    <div
      style={{
        width: 280,
        height: 570,
        borderRadius: 44,
        background: "#0d0d0f",
        padding: 12,
        boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
        position: "relative",
        flex: "0 0 auto",
      }}
      aria-label="FitBox app mockup"
      role="img"
    >
      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          position: "relative",
          background: "#f6f6f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 92,
            height: 26,
            background: "#000",
            borderRadius: 16,
          }}
        />

        <Image
          src={fitboxLogo}
          alt="FitBox"
          width={140}
          height={140}
          style={{ width: 140, height: "auto", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
